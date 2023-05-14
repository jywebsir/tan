<div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
	<h1>Tan</h1>
	<p>适用于微信小程序端的Taro React UI组件库</p>
</div>

### 介绍

Tan是基于大名鼎鼎的微信小程序端组件库Vant Weapp 改写的:

- 复用了Vant Weapp中的样式，只是使用scss抒写了一遍css以及提供了一些css变量方便自定义组件样式。相关的变量会在文档中说明。
- 使用Taro以及React改写了js部分的代码。 
- 组件接口与文档基本复制的vant weapp的，对于不同的部分会在文档中增加相关使用说明。

对于复杂一些的组件独立出了viewmodel以及view，viewmodel负责状态以及交互逻辑，view负责ui渲染，从而实现了逻辑解耦，方便复用以及维护。

设计稿及尺寸单位认配置是750，如果你在Taro的配置中将designWidth设为375，那么请更改styles/variables.scss中$design-width变量到对应的尺寸，组件的尺寸会自动进行转换。



### 站在巨人的肩膀上

- [Vant Weapp](https://vant-contrib.gitee.io/vant-weapp/#/home): 由有赞团队开源出来的的轻量、可靠的微信小程序 UI 组件库
- [Taro](https://taro.jd.com): 由京东开源出来的开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5/React Native 等应用。
- [React](https://reactjs.org): 由facebook开源出来的用于构建用户界面的 JavaScript 库。

### 开发这个组件库的起因

在做微信小程序的过程中使用的是Vant Weapp组件库，但是普遍不太习惯使用微信原生的方式写应用。经过调研，发现京东推出的Taro跨端框架可以使用React写各种小程序，毫不犹豫的投入了Taro的环抱。
所以，萌生了基于Vant Weapp开发Taro React的版本。

### 开发计划

- 第一阶段暂未使用typescript，先完成组件功能，文档以及demo。
- 第二阶段采用typescript改写代码，添加测试。

### 快速上手

请参考 [快速上手](/guide/quickstart)。


### 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
