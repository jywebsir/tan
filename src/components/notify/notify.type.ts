import React from 'react'

export interface NotifyOptions {
	/**
	 * 类型
	 * @default "danger"
	 */
	type?: 'primary' | 'success' | 'warning' | 'danger';

	/**
	 * 字体颜色
	 * @default "#FFFFFF"
	 */
	color?: string;

	/**
	 * 背景颜色
	 */
	background?: string;

	/**
	 * 展示文案，支持通过\n换行
	 */
	message?: string | React.ReactNode;

	/**
	 * 展示时长(ms)，值为 0 时，notify 不会消失
	 * @default 3000
	 */
	duration?: number;

	/**
	 * 是否留出顶部安全距离（状态栏高度）
	 * @default false
	 */
	safeAreaInsetTop?: boolean;

	/**
	 * 点击时的回调函数
	 */
	onClick?: () => void;

	/**
	 * 完全展示后的回调函数
	 */
	onOpened?: () => void;

	/**
	 * 关闭时的回调函数
	 */
	onClose?: () => void;
}