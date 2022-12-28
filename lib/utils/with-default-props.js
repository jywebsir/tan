import assignWith from 'lodash/assignWith';
export function mergeProps() {
  function customizer(objValue, srcValue) {
    return srcValue === undefined ? objValue : srcValue;
  }

  var ret = Object.assign({}, arguments.length <= 0 ? undefined : arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    ret = assignWith(ret, i < 0 || arguments.length <= i ? undefined : arguments[i], customizer);
  }

  return ret;
}