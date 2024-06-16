import React from 'react'
import classNames from 'classnames'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import NavBar from '@/components/nav-bar'

const NavBarPage = props => {
	return(
		<DemoPage>
			<DemoBlock 
				title="基础用法" 
				padding
			>
				<NavBar 
					title="标题" 
					leftText="返回" 
					leftArrow 
				/>
			</DemoBlock>
		</DemoPage>
	)
}

export default NavBarPage 