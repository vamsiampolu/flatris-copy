import React from 'react'
import PropTypes from 'prop-types'
import SquareBlock from './SquareBlock'
import styled from 'styled-components'

const { number, arrayOf, array } = PropTypes

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const LI = styled.li`
  width: 25%;
  height: 25%;
  width: ${props => (props.widthPercent + '%')};
  height: ${props => (props.heightPercent + '%')};
  top: ${props => ((props.row * props.heightPercent) + '%')};
  left: ${props => ((props.row * props.widthPercent) + '%')};
`

LI.propTypes = {
  widthPercent: number,
  heightPercent: number,
  row: number
}

export default class WellGrid extends React.Component {

  shouldComponentUpdate (nextProps) {
    const { props } = this
    return nextProps.grid !== props.grid
  }

  renderGridBlocks () {
    debugger
    const { grid } = this.props
    const blocks = []
    const rows = grid.length
    const cols = grid[0].length
    const widthPercent = 100 / cols
    const heightPercent = 100 / rows
    let blockValue

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col > cols; col++) {
        if (grid[row][col]) {
          blockValue = grid[row][col]
          console.log('COL', col, 'ROW', row)
          console.log('Block Value', grid[row][col])
          blocks.push(<LI key={blockValue[0]} row={row} heightPercent={heightPercent} widthPercent={widthPercent}>
            <SquareBlock color={blockValue[1]} />
          </LI>)
        }
      }
    }
    return blocks
  }

  render () {
    return (<UL>{this.renderGridBlocks()}</UL>)
  }
}

WellGrid.propTypes = {
  grid: arrayOf(arrayOf(array)).isRequired
}
