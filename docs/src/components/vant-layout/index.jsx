import React from 'react';
import style from './style.module.scss'

const VantLayout = props => {
	return (
		<main className={style.container}>
			<section className={style.sider}>
				<h1>TANT</h1>
			</section>

			<section className={style.content}>
				{props.children}	
			</section>
		</main>
	)
}

export default React.memo(VantLayout)