import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { bemBlock, bemElement } from '../../utils/class-name';
import { isImageUrl } from '../../utils/validator';
import Info from '../info';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BLOCK = 'icon';
export var Icon = function Icon(props) {
  var name = props.name,
      dot = props.dot,
      info = props.info,
      classPrefix = props.classPrefix,
      onClick = props.onClick;
  var isImgIcon = isImageUrl(name);
  return withNativeProps(props, /*#__PURE__*/_jsxs("view", {
    className: classNames(bemBlock(BLOCK, {
      image: isImgIcon
    }), !isImgIcon && classPrefix, !isImgIcon && "".concat(classPrefix, "-").concat(name)),
    onTap: onClick,
    children: [(!!info || dot) && /*#__PURE__*/_jsx(Info, {
      dot: dot,
      info: info,
      className: bemElement(BLOCK, 'info')
    }), isImageUrl(name) && /*#__PURE__*/_jsx("image", {
      src: name,
      mode: "aspectFit",
      className: bemElement(BLOCK, 'image')
    })]
  }));
};
Icon.propTypes = {
  name: PropTypes.string,
  dot: PropTypes.bool,
  info: PropTypes.string,
  classPrefix: PropTypes.string,
  onClick: PropTypes.func
};
Icon.defaultProps = {
  classPrefix: 'van-icon'
};