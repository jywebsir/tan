import React from 'react';
import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { bemBlock, bemElement } from '../../utils/class-name';
var BLOCK = 'loading';
var defaultProps = {
  type: 'circular'
};

var renderDots = function renderDots() {
  var dots = [];

  for (var $i = 0; $i < 12; $i++) {
    dots.push( /*#__PURE__*/React.createElement("view", {
      key: $i,
      className: bemElement(BLOCK, 'dot')
    }));
  }

  return dots;
};

export var Loading = function Loading(p) {
  var props = mergeProps(defaultProps, p);
  var isSpinner = props.type === 'spinner';
  return withNativeProps(props, /*#__PURE__*/React.createElement("view", {
    className: bemBlock(BLOCK, {
      vertical: props.vertical
    })
  }, /*#__PURE__*/React.createElement("view", {
    className: bemElement(BLOCK, 'spinner', [props.type])
  }, isSpinner && renderDots()), /*#__PURE__*/React.createElement("view", {
    className: bemElement(BLOCK, 'text')
  }, props.children)));
};