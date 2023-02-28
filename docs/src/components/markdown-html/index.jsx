import React from 'react'
import style from './style.module.scss'

const MarkdownHtml = props => {
	const { children } = props

	return (
		<div 
			dangerouslySetInnerHTML={{__html: children}}
			className={style.container}
		/>
	)
}

export default React.memo(MarkdownHtml)