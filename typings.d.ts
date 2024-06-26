/// <reference path="node_modules/@tarojs/plugin-platform-weapp/types/shims-weapp.d.ts" />
/// <reference path="node_modules/@tarojs/taro/types/index.d.ts" />

declare module "*.png"
declare module "*.gif"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"
declare module "*.css"
declare module "*.less"
declare module "*.scss"
declare module "*.sass"
declare module "*.styl"

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string }
  export default classes
}
