# 介绍

Tan是参照Vant Weapp开发的Taro React版微信小程序端组件库。

### 开发这个组件库的起因

平时工作中开发微信小程序应用比较多的是Vant Weapp组件库，由于团队人员以使用React为主，普遍不太习惯使用微信原生的方式写应用，效率太低。经过调研，发现京东推出的Taro跨端框架可以使用React写各种小程序，毫不犹豫的投入了Taro的环抱。萌生了基于Vant Weapp开发Taro React的版本, 助力小伙伴快速搭建微信小程序应用。

- 复用了Vant Weapp中的样式，视觉规范上保持一致。只是使用scss抒写了一遍css以及提供了一些css变量方便自定义组件样式。
- 使用React的方式重新封装各个组件，提供近似一致的API接口。
- 组件独立出了viewmodel以及view，viewmodel负责状态以及交互逻辑，view负责ui渲染，从而实现了逻辑解耦，方便复用以及维护。
- 组件文档基本上复制的Vant Weapp的文档，添加了一些改动的使用说明。
- 使用 TypeScript 编写，提供完整的类型定义。
- 支持按需引入和 Tree Shaking。

设计稿及尺寸单位认配置是750，如果你在Taro的配置中将designWidth设为375，那么请更改styles/variables.scss中$design-width变量到对应的尺寸，组件的尺寸会自动进行转换。

### 开发计划

- 第一阶段: 支持微信端小程序端，书写文档以及demo。
- 第二阶段：支持H5端。

### 快速上手

请参考 [快速上手](/guide/quickstart)。

### 站在巨人的肩膀上

- [Vant Weapp](https://vant-contrib.gitee.io/vant-weapp/#/home): 有赞开源出来的的轻量、可靠的微信小程序 UI 组件库
- [Taro](https://taro.jd.com): 京东开源出来的开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5/React Native 等应用。
- [React](https://reactjs.org): facebook开源出来的用于构建用户界面的 JavaScript 库。

### 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
