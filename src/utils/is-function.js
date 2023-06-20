import isType from './is-type'

const isFunction = function(value) {
	return isType(value, 'Function');
}

export default isFunction