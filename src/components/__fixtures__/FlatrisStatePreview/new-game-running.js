import {PLAYING} from '../../../constants/states'
import {
  WELL_ROWS,
  WELL_COLS,
  DROP_FRAMES_DEFAULT
} from '../../../constants/grid'
import {SHAPES} from '../../../constants/tetronimo'
import {generateEmptyGrid} from '../../../lib/grid'

export default {
  reduxState: {
    game: {
      gameState: PLAYING,
      score: 0,
      lines: 0,
      nextTetronimo: 'I',
      grid: generateEmptyGrid(WELL_ROWS, WELL_COLS),
      activeTetronimo: 'J',
      activeTetronimoGrid: SHAPES.J,
      activeTetronimoPosition: {x: 4, y: -2},
      dropFrames: DROP_FRAMES_DEFAULT,
      dropAcceleration: false
    }
  }
}
