import isObject from './helpers/is-object';

const falsyValue = function(item) {
	if (Array.isArray(item) && item.length > 0) {
		return false;
	}

	if (
		item !== undefined 
		&& 
		item !== null 
		&& 
		isObject(item) 
		&& 
		Object.keys(item).length > 0
	) {
		return false;
	}

	if (!Array.isArray(item) && !isObject(item) && !!item) {
		return false;
	}

	return true;
};

const filterObject = function(func, items) {
	const result = {};

  Object.keys(items).forEach((key) => {
    if (func) {
      if (func(items[key], key)) {
        result[key] = items[key];
      }
    } else if (!falsyValue(items[key])) {
      result[key] = items[key];
    }
  });

  return result;
};


const filterArray = function(func, items) {
	if (func) {
    return items.filter(func);
  }

  const result = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];

    if (!falsyValue(item)) {
      result.push(item);
    }
  }

  return result;
};

const filter = function(items, fn) {
	const func = fn || false;

  let filteredItems = null;

  if (Array.isArray(items)) {
    filteredItems = filterArray(func, items);
  } else {
    filteredItems = filterObject(func, items);
  }

  return filteredItems;
};

export default filter;