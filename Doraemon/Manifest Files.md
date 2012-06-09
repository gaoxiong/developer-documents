# Manifest Files

豌豆荚扩展所使用的 manifest.json 基于 Google Chrome Extensions 使用的 [manifest.json](http://code.google.com/chrome/extensions/manifest.html) 格式进行扩展。

## 概述

Manifest 是一个必须的文件，放在扩展打包的根目录下，用于保存扩展的配置信息。

下面列举了所有 manifest.json 支持的字段，其中只有 `name` 和 `version` 字段是必须的。

	{
		// Required
		"name": "My Extension",
		"version": "versionString",
		"manifest_version": 2,
		
		// Recommended
		"description": "A plain text description",
		"icons": { ... },
		
		// Add any of these that you need
		"app": {...},
		"content_scripts": [...],
		"homepage_url": "http://path/to/homepage",
		"minimum_client_version": "versionString"
	}

## 字段

### name

扩展名称。显示在扩展管理界面、扩展下载对话框以及扩展商店。为了与 Chrome 兼容，这个字段不应该超过 45 个字符。未来会支持国际化。

### version

版本号。由点号分隔的 1 个到 4 个整数。为了与 Chrome 兼容，每一个整数必须介于 0 到 65535 之间（包括 0 和 65535），且不能包含前导 0。因此，`012` 和 `98765` 都不能用做版本号中的整数。

版本号的对比从最左侧第一个整数开始，遇到长度不一致的两个版本号则使用 0 来补充缺少了的整数。因此 `1.2.3` 大于 `1.2`。

合法的版本号包括

* `"version": "1"`
* `"version": "1.2"`
* `"version": "1.2.34"`
* `"version": "1.2.34.5678"`

### manifest_version

Manifest 版本号。为了与当前版本的 Chrome 兼容，取值应该使用数字 2。

### description

扩展描述。显示在扩展管理界面和扩展下载对话框。为了与 Chrome 兼容，这个字段应该使用不超过 132 个字符的纯文本内容（不能使用 HTML）。未来会支持国际化。

### icons

图标文件集合。豌豆荚使用尺寸为 16 和 72 的图标。为了与 Chrome 兼容，如果找不到对应尺寸的图标，会使用尺寸最相近的图标（优先使用尺寸更大而非更小的）进行缩放处理。推荐使用 PNG 格式的图片，不过也支持其它 WebKit 浏览器能正常显示的图片。

	"icons": {
		"16": "icon16.png",
		"72": "icon72.png"
	}

### app

应用配置信息。配置这个应用的启动页面地址，以及所需要用到的地址范围。

	"app": {
		"urls": [
			"*://mail.google.com/mail/",
			"*://www.google.com/mail/"
		],
		"launch": {
			"web_url": "http://mail.google.com/mail/"
		},
		"navigation": [
			{
				"label": "Inbox",
				"web_url": "https://mail.google.com/mail/#inbox"
			},
			{
				"label": "Starred",
				"web_url": "https://mail.google.com/mail/#starred"
			},
			{
				"label": "Important",
				"web_url": "https://mail.google.com/mail/#imp"
			}
		]
	}

#### urls

应用所要用到的地址）。这部分地址的浏览会在豌豆荚里面无缝切换，但如果用户点击这部分地址覆盖范围外的链接，则链接目标会在浏览器中打开。

#### launch

启动页面地址。如果启动页面是 HTTP(S) 地址，则使用 `web_url`；如果是扩展打包资源中的页面，则使用 `local_path`。

##### web_url

指定远程启动页面。其取值应该为使用 HTTP 或 HTTPS 协议的绝对地址。

#### local_path

指定本地启动页面。其取值应该为相对于扩展打包目录的相对地址。

	"app": {
		"launch": {
			"local_path": "main.html"
		}
	}

#### navigation

零个到八个导航入口的地址。每一个导航用口使用 `label` 属性来指定显示名称，使用 `web_url` 属性或 `local_path` 属性指定链接地址。如果链接目标指向 HTTP(S) 地址，就使用 `web_url`；如果链接目标指向扩展包内的页面，就使用 `local_path` 并使用相对路径。

### content_scripts

需要运行在页面上下文中的脚本。

	"content_scripts": [
		{
			"matches": ["http://www.google.com/*"],
			"css": ["mystyles.css"],
			"js": ["jquery.js", "myscript.js"]
		}
	]

`content_scripts` 属性取值为一个数组，数组里面包含一条或多条规则，每一条规则可以包含以下属性：`matches`、`exclude_matches`、`css`、`js`、`run_at`、`all_frames`。其中只有 `matches` 属性是必须的，其它都是可选属性。

#### matches

匹配的地址。只要页面地址属于匹配地址，就会被插入对应的脚本。

地址支持模式匹配，每一条匹配规则都包含 scheme、host、path 这三部分（特殊匹配规则 `<all_urls>` 除外）。具体的匹配规则如下：

	<url-pattern> := <scheme>://<host><path>
	<scheme> := '*' | 'http' | 'https' | 'file' | 'ftp' | 'snappea-extension'
	<host> := '*' | '*.' <any char except '/' and '*'>+
	<path> := '/' <any chars>

`'*'` 出现在 scheme 内，会被视为配位 HTTP 和 HTTPS 协议。`'*'` 出现在 host 内，会被视为匹配任何域名，但如果是以 `'*.hostname'` 的形式出现则被视为匹配任意子域名。`'*'` 出现在 path，可匹配零个到任意多个字符。

以下都是有效的匹配规则：

	http://*/*
	http://*/foo*
	https://*.google.com/foo*bar
	http://example.org/foo/bar.html
	file:///foo*
	http://127.0.0.1/*
	*://mail.google.com/*
	snappea-extension://*/*
	<all_urls>

`<all_urls>` 可以匹配任意地址，前提是地址属于上述允许的任何一个 scheme。

#### exclude_matches

匹配排除的地址。只要页面地址属于匹配排除地址，就不会被插入对应的脚本。

地址支持模式匹配，规则与 `matches` 描述的一致。

#### css

需要插入的 CSS 文件列表。插入顺序与它们在数组中的顺序一致。CSS 总是会被插入到文档的头部。

#### js

需要插入的 JavaScript 文件列表。插入顺序与它们在数组中的顺序一致。

#### run_at

JavaScript 文件何时插入，可选的值包括：`'document_start'`、`'document_end'`、`'document_idle'`，分别对应文档头、文档尾，以及 `window.onload` 触发完成后。

#### all_frames

控制插入内容是只插入到 `top` frame 还是所有的 frame。默认值为 `false`。

### homepage_url

扩展首页地址。如果扩展通过扩展商店发布，则默认指向扩展商店详情页。

### minimum_client_version

扩展可以支持的豌豆荚客户端最低版本号（[类似 Chrome 的 `minimum_chrome_version`](http://code.google.com/chrome/extensions/manifest.html#minimum_chrome_version)）。格式与 `version` 一致。
