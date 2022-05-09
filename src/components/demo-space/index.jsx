import React from 'react'
import Row from '@/tan/components/row'
import style from './style.module.scss'

const DemoSpace = props => {
	return (
		<Row className={style.container}>{props.children}</Row>
	)
}

export default React.memo(DemoSpace)