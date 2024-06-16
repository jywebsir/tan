import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'

const Grid = props => {
  const { columns } = props
}

Grid.propTypes = {
  // 一行的列数
  columns: PropTypes.number,

}

Grid.defaultProps = {
  columns: 2
}
