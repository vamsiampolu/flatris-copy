import _ from 'lodash'
import { SHAPES } from '../constants/tetronimo'

export const getRandomTetronimo = () => _.sample(Object.keys(SHAPES))

/*
   * Generates positions a Tetromino entering the Well. The I Tetromino
   * occupies columns 4, 5, 6 and 7, the O Tetromino occupies columns 5 and
   * 6, and the remaining 5 Tetrominoes occupy columns 4, 5 and 6. Pieces
   * spawn above the visible playfield (that's why y is -2)
*/
export const getInitialPositionForTetronimo = (type, gridCols) => {
  const grid = SHAPES[type]
  return { x: Math.round(gridCols / 2) - Math.round(grid[0].length / 2), y: -2 }
}
