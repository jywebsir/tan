import { View } from '@tarojs/components'
import classNames from 'classnames'
import { withNativeProps } from '@tan/common'
import style from './style.module.scss'

const DemoPage = (props) => {
	const { bgColor } = props

  const { 
    className,
    children
  } = props

  return withNativeProps(
		props,
    <View
      className={classNames(
        style.container, 
        className
      )}
			style={{backgroundColor: bgColor}}
    >
      {children}
    </View>
  )
}

export default DemoPage