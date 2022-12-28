import isObject from "./is-object";

const validate = function(items) {
	if (!Array.isArray(items) && !isObject(items)) {
		throw new Error('items should be an array or object')
	}
}

export default validate;