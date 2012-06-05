# Download Link

## 概述

这个文档说明豌豆荚百宝袋如何识别下载链接，以及如何从下载链接中提取目标文件的相关信息（meta data）。

一个典型的百宝袋下载链接应该是这样子的：

	<a href="app.apk#type=apps&name=app&image=%2Fimages%2Fapp-icon.png" rel="download">Download</a>

豌豆荚百宝袋会对 `a` 标签中的如下信息作出响应：

## rel="download"

`rel="download"` 属性向豌豆荚客户端表明这个链接的目标用于下载。

在一般情况下，豌豆荚客户端会根据内容的 content-type 属性做出判断，到底应该是下载还是直接展示。但如果要想要下载的内容是纯文本或者 HTML，豌豆荚的默认行为会是直接展示，这时候就需要通过 `rel="download"` 来提示豌豆荚将默认行为变更为下载。

## href="...\#key1=value1&key2=value2"

豌豆荚可以通过 `href` 属性获取到下载地址，但无法获取到下载内容的相关信息（meta data），例如说是应用的图标。这些信息可以以键值对（key-value）的形式在 `#` 后面的锚点传递给豌豆荚，使用起来类似于查询字符串（query string）。

豌豆荚对可以处理锚点里面的这些键值：

### type

类型，用来标示下载文件的数据类型。

apps：apk文件

music：音乐

photo：图片

video：视频

book：电子书

### name

名称。会显示在资源管理界面和下载任务管理器。

如果下载链接所在的网页上使用了 micro-format，在锚点不提供 `name` 属性时，该属性从同一个 `itemscope` 内的 `*[itemprop=name]` 元素上获取。

### image

图标。会显示在资源管理界面和下载任务管理器。

如果下载链接所在的网页上使用了 micro-format，在锚点不提供 `image` 属性时，该属性从同一个 `itemscope` 内的 `*[itemprop=image]` 或 `*[itemprop=thumbnail] *[itemprop=image]` 或 `*[itemprop=thumbnailUrl]` 元素上获取。

### size

文件体积。文件在下载过程中如果提供了 content-length 属性，则以 content-length 属性为准。文嘉下载后，以实际存储的文件体积为准。会显示在资源管理界面和下载任务管理器。

如果下载链接所在的网页上使用了 micro-format，在锚点不提供 `size` 属性时，该属性从同一个 `itemscope` 内的 `*[itemprop=fileSize]` 或 `*[itemprop=contentSize]` 元素上获取。