import React from 'react'
import classNames from 'classnames'
import { withNativeProps } from '../../../src/utils/native-props'
import Row from '@/components/row'
import style from './style.module.scss'

const DemoSpace = props => {
	return withNativeProps(
		props,
		<Row className={
			style.container
		}>{props.children}</Row>
	)
}

export default React.memo(DemoSpace)