# Flex布局

## 介绍
该组件是 CSS flex 布局的一个封装。


## 代码演示

### 基础用法

```javascript
import Row from 'path/to/czh/packages/row'
import Col from 'path/to/czh/packages/col'

<Row align="stretch">
	<Col span="8">span: 8</Col>
	<Col span="8">span: 8</Col>
	<Col span="8">span: 8</Col>
</Row>

<Row>
	<Col span="4">span: 4</Col>
	<Col span="10" offset="4">offset: 4, span: 10</Col>
</Row>

<Row>
	<Col span="12" offset="12">offset: 12, span: 12</Col>	
</Row>
```

### 行对齐方式

``` html
<Row 
	justify="end" 
	align="stretch" 
>
	<Col span="8" >start</Col>

	<Col span="8">start</Col>
</Row>
```

### 列水平对齐方式

```html
<Row 
	justify="start" 
	align="stretch" 
>
	<Col 
		span="8" 
		align="start"
	>start</Col>

	<Col 
		span="8" 
		align="center"
	>center</Col>	

	<Col 
		span="8" 
		align="end"
	>end</Col>
</Row>
```

### 列垂直对齐方式

``` html
<Row 
	justify="start" 
	align="stretch" 
>
	<Col 
		span="8" 
		justify="start"
	>start</Col>

	<Col 
		span="8" 
		justify="center"
	>center</Col>

	<Col 
		span="8" 
		justify="end"
	>end</Col>
</Row>	
```