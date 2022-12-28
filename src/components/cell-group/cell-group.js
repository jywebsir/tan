import React from 'react';
import PropTypes from 'prop-types';
import { bemBlock, bemElement } from '../../utils/class-name';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BLOCK = 'cell-group';
export var CellGroup = function CellGroup(props) {
  var title = props.title,
      border = props.border,
      inset = props.inset,
      children = props.children;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [title && /*#__PURE__*/_jsx("view", {
      className: bemElement(BLOCK, 'title', [{
        inset: inset
      }]),
      children: title
    }), /*#__PURE__*/_jsx("view", {
      className: bemBlock(BLOCK, [{
        inset: inset,
        border: border
      }]),
      children: children
    })]
  });
};
CellGroup.propTypes = {
  title: PropTypes.string,
  border: PropTypes.bool,
  inset: PropTypes.bool
};
CellGroup.defaultProps = {
  border: true
};