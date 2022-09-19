import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'

const BLOCK = 'index-bar'

const getIndexList = () => {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
};

export const IndexBar = props => {
	const { children } = props

	const [activeAnchorIndex, setActiveAnchorIndex] = useState(null)

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			{chidlren}
		</view>	
	)
}

IndexBar.propTypes = {
	sticky: PropTypes.bool,
	zIndex: PropTypes.number,
	highlightColor: PropTypes.string,
	stickyOffsetTop; PropTypes.number,
	indexList: PropTypes.arrayOf(PropTypes.string)
}

IndexBar.defaultProps = {
	zIndex: 1,
	highlightColor: '#07c160',
	stickyOffsetTop: 0,
	indexList: getIndexList()
}