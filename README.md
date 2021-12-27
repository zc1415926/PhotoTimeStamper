# PhotoTimeStamper
最近，要给把娃儿1岁以前的照片洗出来。想一想，还是给每张照片加上拍摄日期，这样可以帮助我们想起这张照片是什么时候拍的。但是选出来的几百张照片我要是一张一张地加文字那真是要累死我了。

我找了一下，网上也没有合适的批量加字的软件，或者说手痒了，就是想自己编个程序来玩，由于就有了这个插件的编写。

## 使用方法
先要在Lightroom里调整照片，导出成YYYY.MM.DD-HH.MM.SS的格式，横线前的日期读取后用作时间戳，横线后的时间防止文件名重复。

把一组照片拖到PS里打开，启动本插件。先选择要添加的时间戳字体，再按确定按钮就可以自动保存并关闭当前图片。

## 使用的技术
本插件使用了Adobe Photoshop UXP相关的技术编写而成，具体的参考文献以后会列在下边，如果可能的话我再写一个简单的教程，方便自己以后再把这段内容捡起来


## 相关资料
### Official Reference and Guide
[Getting Started with UXP for Photoshop](https://www.adobe.io/photoshop/uxp/2022/guides/)

[UXP for Adobe Photoshop 2022](https://www.adobe.io/photoshop/uxp/2022/)

[UXP for Photoshop API](https://www.adobe.io/photoshop/uxp/ps_reference/classes/photoshop/)

[UXP for Photoshop API 2022](https://www.adobe.io/photoshop/uxp/2022/ps_reference/classes/action/)

[UXP for Photoshop Quickstart guide](https://www.adobe.io/photoshop/uxp/2022/guides/)

[UXP Reference 2022](https://www.adobe.io/photoshop/uxp/2022/uxp/reference-js/)

[UXP Photoshop Plugin Sample](https://github.com/AdobeDocs/uxp-photoshop-plugin-samples)

[Adobe Photoshop forum](https://forums.creativeclouddeveloper.com/c/photoshop/63)

### Tutorial

[Adobe UXP: Things you need to know!](https://www.davidebarranca.com/development/adobe-uxp-things-you-need-to-know)

[Things-You-Need-To-Know Code](https://github.com/undavide/Adobe-UXP/tree/main/Things-You-Need-To-Know)

### BatchPlay
[Alchemist Plugin Github](https://github.com/jardicc/alchemist)

### UI
[Designing a plugin experience](https://www.adobe.io/photoshop/uxp/2022/design/)

[User Interface](https://www.adobe.io/photoshop/uxp/2022/design/user-interface/)

[Meet Spectrum,Adobe’s design system](https://spectrum.adobe.com/)

[Specturm Web Component](https://opensource.adobe.com/spectrum-web-components/components/accordion/)

### The future
[Photoshop API Changelog](https://developer-stage.adobe.com/photoshop/uxp/2022/ps_reference/changelog/)

[Roadmap](https://trello.com/b/Qag1BazI/photoshop-extensibility-roadmap)