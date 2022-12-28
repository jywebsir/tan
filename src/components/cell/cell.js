import _defineProperty from "/Users/jackyin/MyWorkspace/taro-vant/node_modules/babel-preset-taro/node_modules/@babel/runtime/helpers/esm/defineProperty.js";

var _Cell$propTypes;

import React from 'react';
import PropTypes from 'prop-types';
import { withNativeProps } from '../../utils/native-props';
import { bemBlock, bemElement, getBlockName, getElementName } from '../../utils/class-name';
import { isString } from '../../utils/validator';
import Icon from '../icon';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BLOCK = 'cell';
var BLOCK_NAME = getBlockName(BLOCK);
export var Cell = function Cell(props) {
  var icon = props.icon,
      title = props.title,
      value = props.value,
      label = props.label,
      size = props.size,
      border = props.border,
      center = props.center,
      clickable = props.clickable,
      rightIcon = props.rightIcon,
      required = props.required,
      hoverClass = props.hoverClass,
      children = props.children,
      onClick = props.onClick;
  var blockClassNames = bemBlock(BLOCK, [size, {
    center: center,
    required: required,
    clickable: clickable,
    borderless: !border
  }]);
  return withNativeProps(props, /*#__PURE__*/_jsxs("view", {
    className: blockClassNames,
    hoverClass: "".concat(BLOCK_NAME, "--hover"),
    onTap: onClick,
    children: [isString(icon) ? /*#__PURE__*/_jsx(Icon, {
      name: icon,
      className: bemElement(BLOCK, 'left-icon-wrap')
    }) : icon, /*#__PURE__*/_jsxs("view", {
      className: bemElement(BLOCK, 'title'),
      children: [title, label && /*#__PURE__*/_jsx("view", {
        className: bemElement(BLOCK, 'label'),
        children: label
      })]
    }), /*#__PURE__*/_jsx("view", {
      className: bemElement(BLOCK, 'value'),
      children: value || children
    }), rightIcon && /*#__PURE__*/_jsx("view", {
      className: bemElement(BLOCK, 'right-icon-wrap'),
      children: rightIcon === true ? /*#__PURE__*/_jsx(Icon, {
        name: "arrow",
        className: bemElement(BLOCK, 'right-icon')
      }) : rightIcon
    })]
  }));
};
Cell.propTypes = (_Cell$propTypes = {
  icon: PropTypes.node
}, _defineProperty(_Cell$propTypes, "icon", PropTypes.oneOfType([PropTypes.string, PropTypes.element])), _defineProperty(_Cell$propTypes, "title", PropTypes.node), _defineProperty(_Cell$propTypes, "value", PropTypes.node), _defineProperty(_Cell$propTypes, "label", PropTypes.node), _defineProperty(_Cell$propTypes, "rightIcon", PropTypes.oneOfType([PropTypes.bool, PropTypes.node])), _defineProperty(_Cell$propTypes, "size", PropTypes.string), _defineProperty(_Cell$propTypes, "border", PropTypes.bool), _defineProperty(_Cell$propTypes, "center", PropTypes.bool), _defineProperty(_Cell$propTypes, "clickable", PropTypes.bool), _defineProperty(_Cell$propTypes, "required", PropTypes.bool), _defineProperty(_Cell$propTypes, "hoverClass", PropTypes.string), _defineProperty(_Cell$propTypes, "onClick", PropTypes.func), _Cell$propTypes);
Cell.defaultProps = {
  border: true,
  center: false,
  clickable: false,
  required: false
};