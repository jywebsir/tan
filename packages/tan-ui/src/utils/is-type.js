const toString = {}.toString;

const isType = (
	value, 
	type
) => {
	return toString.call(value) === '[object ' + type + ']';
};

export default isType;