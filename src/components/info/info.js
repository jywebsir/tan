import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { jsx as _jsx } from "react/jsx-runtime";
var classPrefix = 'tan-info';
export var Info = function Info(props) {
  var dot = props.dot,
      info = props.info;

  if (!!info || dot) {
    return withNativeProps(props, /*#__PURE__*/_jsx("view", {
      className: classNames(classPrefix, dot && "".concat(classPrefix, "--dot")),
      children: info
    }));
  }

  return null;
};
Info.propTypes = {
  dot: PropTypes.bool,
  info: PropTypes.string
};
Info.defaultProps = {
  dot: true,
  info: null
};