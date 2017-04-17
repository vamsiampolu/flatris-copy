import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import SquareBlock from './SquareBlock'

const { number, string, arrayOf } = PropTypes

// Square blocks will transition their fall when lines are cleared beneath them
const TetronimoBlock = styled.li`
  width: 25%;
  height: 25%;
  position: absolute;
  top: ${props => ((props.row * 25) + '%')};
  left: ${props => ((props.col * 25) + '%')};
  transition: top 0.1s linear;
`

TetronimoBlock.propTypes = {
  row: number,
  col: number
}

const Tetronimo = (props) => {
  const { color, grid } = props
  const rows = grid.length
  const cols = grid[0].length
  let blocks = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col]) {
        blocks.push(<TetronimoBlock row={row} col={col} key={uuid()} >
          <SquareBlock color={color} />
        </TetronimoBlock>)
      }
    }
  }

  return (<ul>{blocks}</ul>)
}

Tetronimo.propTypes = {
  color: string.isRequired,
  grid: arrayOf(arrayOf(number)).isRequired
}

const StyledTetronimo = styled(Tetronimo)`
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: relative;
  width: 100%;
  height:100%;
`

StyledTetronimo.propTypes = Tetronimo.propTypes

export default StyledTetronimo
