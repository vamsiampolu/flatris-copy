import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../constants/tetronimo'
import {getExactPosition} from '../lib/grid'
import WellGrid from './WellGrid'
import Tetronimo from './Tetronimo'

const ActiveTetronimoContainer = styled.div`
  position: absolute;
  top: ${props => `${100 / props.rows * props.y}%`};
  left: ${props => `${100 / props.cols * props.x}%`};
  width: ${props => `${100 / props.cols * 4}%`};
  height: ${props => `${100 / props.rows * 4}%`};
`

const ContainsWell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledWellGrid = styled(WellGrid)`
  position: relative;
  width: 100%;
  height: 100%;
`

export default class Well extends React.Component {
  //TODO implement shouldComponentUpdate

  render () {
    const {props} = this
    const {
      grid,
      activeTetronimoPosition,
      activeTetronimo,
      activeTetronimoGrid
    } = props
    const rows = grid.length
    const cols = grid[0].length
    const {x, y} = getExactPosition(activeTetronimoPosition)
    return (
      <ContainsWell>
        {activeTetronimo
          ? <ActiveTetronimoContainer rows={rows} cols={cols} x={x} y={y}>
              <Tetronimo
                color={COLORS[activeTetronimo]}
                grid={activeTetronimoGrid}
              />
            </ActiveTetronimoContainer>
          : null}
        <StyledWellGrid grid={grid} />
      </ContainsWell>
    )
  }
}
