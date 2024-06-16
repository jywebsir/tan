import React from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonEventFunction } from "@tarojs/components/types/common"
import { View } from '@tarojs/components'
import { NativeProps, withNativeProps, mergeProps } from '@tan/common'

export type SpaceProps = {
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
  wrap?: boolean
  block?: boolean
  children?: ReactNode
	onClick?: CommonEventFunction
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>

const classPrefix = `tan-space`

const defaultProps = {
  direction: 'horizontal'
}

export const Space: FC<SpaceProps> = p => {
	const props = mergeProps(defaultProps, p)

	const { 
		direction, 
		justify,
		align,
		wrap,
		block,
		children,
		onClick 
	} = props

	const clsName = classNames(classPrefix, {
		[`${classPrefix}-wrap`]: wrap,
		[`${classPrefix}-block`]: block,
		[`${classPrefix}-${direction}`]: true,
		[`${classPrefix}-align-${align}`]: !!align,
		[`${classPrefix}-justify-${justify}`]: !!justify,
	})

	return withNativeProps(
		props,
		<View className={clsName} onClick={onClick}>
			{React.Children.map(children, child => {
        return (
          child !== null &&
          child !== undefined 
					&& (
            <View className={`${classPrefix}-item`}>{child}</View>
          )
        )
      })}
		</View>
	) 
}




