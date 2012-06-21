Doraemon开发者文档
================
1.开发标准
----------
合格的Doraemon扩展包，应该满足以下条件：

- 在豌豆荚中能打开的页面宽度修改为适应豌豆荚的默认宽度 (760px)
- 页面中的可下载资源应该遵循micro-format中定义的格式，否则无法下载
- manifest.json匹配规则禁止使用http://*/*
- 扩展包的文件格式必须是UTF-8编码（无BOM）

2. manifest.json介绍
-------

* 参见文档《[manifest files]》

3. Download API介绍
-------

* 参见文档《[Download Link]》

4. 百宝袋开发工具介绍
-------

    4.1. 加载本地扩展包

       豌豆荚开发者版的左边栏提供“管理”入口，在管理页面的右上角提供“载入扩展”按钮，会弹出一个本地目录选择器，以提供开发者载入本地正在开发的扩展。
       加载完成之后，在豌豆荚的左侧栏会出现该扩展包对应的标签。

    4.2. 调试本地扩展包

       开发者可以点击左侧栏对应的标签，进入扩展包对应的页面。
       在豌豆荚中可以用右键选择审查元素进行调试。

    4.3. 管理本地扩展包

       开发者点击左侧栏的“管理”入口进入管理页面。在此页面中，开发者可以看到所有加载的扩展包。

    4.4. 打包扩展

       开发者在管理页面中可以对已经加载的本地扩展包进行打包。

    4.5. 上传扩展包

       访问http://www.wandoujia.com/webstore/dev，其中有上传扩展包的入口。

  [manifest files]: https://github.com/wandoulabs/developer-documents/blob/master/Doraemon/Manifest%20Files.md
  [Download Link]: https://github.com/wandoulabs/developer-documents/blob/master/Doraemon/Download%20Link.md