import isFunction from '../is-function'
import isObject from '../is-object'
import validate from './helpers/validate'

const search = function(items, valueOrFunction, strict = false) {
	validate(items)

	let result

	const find = (item, key) => {
    if (isFunction(valueOrFunction)) {
      return valueOrFunction(items[key], key);
    }

    if (strict) {
      return items[key] === valueOrFunction;
    }

    return items[key] == valueOrFunction;
  }

  if (Array.isArray(items)) {
    result = items.findIndex(find)
  } else if (isObject(items)) {
    result = Object.keys(items).find(key => find(items[key], key))
  }

  if (result === undefined || result < 0) {
    return false;
  }

  return result
}

export default search