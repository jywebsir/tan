import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Tan',
  description: '微信小程序端的Taro React UI组件库',
  icon: "/rspress-icon.png",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png",
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/jywebsir/tan' },
    ],
    footer: {
      message: 'Tan | Open-source MIT Licensed'
    },
    outlineTitle: '内容大纲',
    prevPageText: '上一页',
    nextPageText: '下一页',
    search: false
  }
});
