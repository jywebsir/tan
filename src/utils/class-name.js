import classNames from "classnames"

export const BASE_PREFIX = 'tan'

const composeModifiers = (modifiers, conf) => {
	if ( ! conf) {
		return
	}

	if (typeof conf === 'string' || typeof conf === 'number') {
    modifiers.push(conf)
  } else if (Array.isArray(conf)) {
    conf.forEach(function(item) {
      composeModifiers(modifiers, item)
    })
  } else if (typeof conf === 'object') {
    Object.keys(conf).forEach(function(key) {
      conf[key] && modifiers.push(key)
    })
  }
}

const getModifierClassNames = (name, modifiers = []) => {
	const mods = modifiers.map((mod) => {
		return `${name}--${mod}`
	})	

	return classNames(mods)
}

export const getBlockName = (name) => {
	return `${BASE_PREFIX}-${name}`
}

export const getElementName = (block, element) => {
	const blockName = `${BASE_PREFIX}-${block}`	
	const elementName = `${blockName}__${element}`

	return elementName 
}

export const bemBlock = (name, conf) => {
	const modifiers = []

	composeModifiers(modifiers, conf)	

	const blockName = getBlockName(name)

	const modClassNames = getModifierClassNames(blockName, modifiers)

	return classNames(blockName, modClassNames)
}

export const bemElement = (block, element, conf) => {
	const modifiers = []

	composeModifiers(modifiers, conf)	

	const elementName = getElementName(block, element)
	const modClassNames = getModifierClassNames(elementName, modifiers)	

	return classNames(elementName, modClassNames)	
}
