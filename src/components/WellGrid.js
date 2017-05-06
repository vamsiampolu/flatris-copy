import React from 'react'
import PropTypes from 'prop-types'
import SquareBlock from './SquareBlock'
import styled from 'styled-components'

const {number, array} = PropTypes

const LI = styled.li`
  position: absolute;
  transition: top 0.1s linear;
  width: ${props => `${props.widthPercent}%`};
  height: ${props => `${props.heightPercent}%`};
  top: ${props => `${props.row * props.heightPercent}%`};
  left: ${props => `${props.col * props.widthPercent}%`};
`

function GridListItem (props) {
  const {widthPercent, heightPercent, row, col, blockValue} = props
  return (
    <LI
      widthPercent={widthPercent}
      heightPercent={heightPercent}
      row={row}
      col={col}
    >
      <SquareBlock color={blockValue[1]} />
    </LI>
  )
}

GridListItem.propTypes = {
  widthPercent: number,
  heightPercent: number,
  row: number,
  col: number,
  blockValue: array
}

const WellGridList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

export default class WellGrid extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.grid !== this.props.grid
  }

  renderGridBlocks () {
    const {props} = this
    const {grid} = props

    let blocks = []

    const rows = grid.length
    const cols = grid[0].length
    const widthPercent = 100 / cols
    const heightPercent = 100 / cols

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col]) {
          let blockValue = grid[row][col]
          blocks.push(
            <GridListItem
              widthPercent={widthPercent}
              heightPercent={heightPercent}
              row={row}
              col={col}
              blockValue={blockValue}
              key={blockValue[0]}
            />
          )
        }
      }
    }
    return blocks
  }

  render () {
    return <WellGridList>{this.renderGridBlocks()}</WellGridList>
  }
}
