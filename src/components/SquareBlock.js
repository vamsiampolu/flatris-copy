import PropTypes from 'prop-types'
import styled from 'styled-components'

const { string } = PropTypes

// square-block css can be re-written as a styled-component
const SquareBlock = styled.div`
   width: 100%;
   height: 100%;
   background-color: ${props => props.color};
`

SquareBlock.propTypes = {
  color: string.isRequired
}

export default SquareBlock
