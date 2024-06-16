import React, { useState } from 'react'
import { useMount } from 'ahooks'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import CellGroup from '@/components/cell-group'
import Button from '@/components/button'
import Cell from '@/components/cell'
import Field from '@/components/field'

const FieldPage = () => {
	const [basicValue, setBasicValue] = useState(null)
	const [username, setUsername] = useState('')
	const [username2, setUsername2] = useState(null)
	const [username3, setUsername3] = useState(null)
	const {phone, setPhone} = useState(null)
	const [message, setMessage] = useState(null)
	const [password, setPassword] = useState(null)

	const onChangeBasicValue = (value) => {
		setBasicValue(value)
	}

	const onChangeUsername = (value) => {
		setUsername(value)
	}

	const onChangePassword = (value) => {
		setPassword(value)
	}

	const onClickIcon = () => {
		wx.showToast({
			icon: 'none',
			title: '点击图标',
		})
	}

	useMount(() => {
		setBasicValue('基本用法')
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<Field 
					label="文本"
					placeholder="请输入文本"
					border={false}
					value={basicValue}
					onChange={onChangeBasicValue}	
				/>	
			</DemoBlock>

			<DemoBlock title="自定义类型">
				<CellGroup>
					<Field 
						label="用户名"
						placeholder="请输入用户名"
						rightIcon="question-o"
						clearable
						required
						onClickIcon={onClickIcon}
					/>

					<Field 
						label="密码"
						placeholder="请输入密码"
						border={false}
						password
						required
					/>
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="禁用输入框">
				<CellGroup>
					<Field 
						label="用户名"
						value="输入框已禁用"
						border={false}
						disabled
					/>	
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="错误提示">
				<CellGroup>
					<Field 
						value={username2}
						label="用户名"
						placeholder="请输入用户名"
						error
					/>		

					<Field 
						value={phone}
						label="手机号"
						placeholder="请输入手机号"
						errorMessage="手机号格式错误"
						border={false}
					/>	
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="内容对齐方式">
				<CellGroup>
					<Field 
						value={username3}
						label="用户名"
						placeholder="请输入用户名"
						inputAlign="right"
					/>		
				</CellGroup>	
			</DemoBlock>

			<DemoBlock title="显示字数统计">
				<CellGroup>
					<Field 
						label="用户名"
						placeholder="请输入用户名"
						maxlength={20}
						value={username}
						showWordLimit
						onChange={onChangeUsername}
					/>		
				</CellGroup>	
			</DemoBlock>

			<DemoBlock title="高度自适应">
				<CellGroup>
					<Field 
						value={message}
						type="textarea"
						label="留言"
						placeholder="请输入留言"
						autosize
						border={false}
					/>		
				</CellGroup>		
			</DemoBlock>

			<DemoBlock title="插入按钮">
				<CellGroup>
					<Field 
						label="短信验证码"
						placeholder="请输入短信验证码"
						rightButton={<Button size="small" type="primary">发送验证码</Button>}
						center
						clearable
						border={false}
					/>		
				</CellGroup>
			</DemoBlock>
		</DemoPage>
	)
}

export default FieldPage