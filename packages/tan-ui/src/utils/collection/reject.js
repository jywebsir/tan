import validate from './helpers/validate';
import filter from './filter';

const reject = function(items, fn) {
	validate(items);

	return filter(items, item => !fn(item));
};

export default reject;