(function() {
    var getDownloadLinks = function() {
        var links = document.getElementsByTagName('a');
        var downloadLinks = [];
        
        for (var i = 0, l = links.length; i < l; i++) {
            var link = links[i];
            var rel = link.getAttribute('rel');
            var itemprop = link.getAttribute('itemprop');
            if (rel === 'download' ||
                itemprop === 'downloadUrl' ||
                itemprop === 'contentUrl') {
                    downloadLinks.push(link);
                }
        }
        
        return downloadLinks;
    };
    
    var processDownloadLinks = function(links) {
        for (var i = 0, l = links.length; i < l; i++) {
            var link = links[i];
            link.setAttribute('rel', 'download');
            
            var hash = {};
            link.hash.replace(/[\#\&]([^=^&]*)=([^&]*)/g, function(whole, key, value) {
                hash[key] = value;
                return whole;
            })
            
            var scopeElement = getNearestScopeElement(link);
            var itemProps = getItemProps(scopeElement);
            if (itemProps.name && !hash.name) {
                hash.name = encodeURIComponent(itemProps.name);
            }
            if ((itemProps.image || itemProps.thumbnailUrl || itemProps.thumbnail.image) && !hash.image) {
                hash.image = encodeURIComponent(itemProps.image || itemProps.thumbnailUrl || itemProps.thumbnail.image)
            }
            if ((itemProps.fileSize || itemProps.contentSize) && !hash['content-length']) {
                hash['content-length'] = encodeURIComponent(itemProps.fileSize || itemProps.contentSize);
            }
            
            var hashArray = [];
            for (var key in hash) {
                hashArray.push(key + '=' +hash[key]);
            }
            
            link.hash = '#' + hashArray.join('&');
        }
    };
    
    var getNearestScopeElement = function(element) {
        while (element && !element.hasAttribute('itemscope')) {
            element = element.parentNode;
        }
        return element;
    };
    
    var getItemProps = function(scopeElement) {
        var allPropElements = scopeElement.querySelectorAll('*[itemprop]');
        var directItemProps = {};
        scopeElement = getNearestScopeElement(scopeElement);
        for (var i = 0, l = allPropElements.length; i < l; i++) {
            var propElement = allPropElements[i];
            if (getNearestScopeElement(propElement) === scopeElement) {
                var itemProp = getItemProp(propElement);
                if (itemProp.key) {
                    directItemProps[itemProp.key] = itemProp.value;
                }
            }
        }
        return directItemProps;
    };
    
    var getItemProp = function(propElement) {
        /* see Microdata standard for how to extract value from element: http://www.w3.org/TR/microdata/#values */
        var property = {};
        property.node = propElement;
        property.key = propElement.getAttribute('itemprop');
        
        if (propElement.hasAttribute('itemscope')) {
            /* embedded struct */
            property.value = getItemProps(propElement);
        } else {
            switch (propElement.nodeName) {
                case 'META':
                    property.value = propElement.getAttribute('content');
                    break;
                case 'AUDIO':
                case 'EMBED':
                case 'IFRAME':
                case 'IMG':
                case 'SOURCE':
                case 'TRACK':
                case 'VIDEO':
                    /* let the browser resolve src attribute and provide absolute path in src property */
                    property.value = propElement.src;
                    break;
                case 'A':
                case 'AREA':
                case 'LINK':
                    /* let the browser resolve href attribute and provide absolute path in href property */
                    property.value = propElement.href;
                    break;
                case 'OBJECT':
                    property.value = propElement.data;
                    break;
                case 'DATA':
                    property.value = propElement.value;
                    break;
                case 'TIME':
                    property.value = propElement.getAttribute('datetime');
                    break;
                default:
                    property.value = propElement.textContent;
                    break;
            }
        }
        return property;
    };
    
    window.addEventListener ('DOMContentLoaded', function() {
        var links = getDownloadLinks();
        processDownloadLinks(links);
    }, false);
})();