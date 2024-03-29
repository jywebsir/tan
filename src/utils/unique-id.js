const map = {};

const uniqueId = (prefix) => {
  prefix = prefix || 'g';

  if (!map[prefix]) {
    map[prefix] = 1;
  } else {
    map[prefix] += 1;
  }
	
  return prefix + map[prefix];
};

export default uniqueId;
