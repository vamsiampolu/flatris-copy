import { STOPPED, PLAYING, PAUSED } from '../constants/states'
import {
  WELL_ROWS,
  WELL_COLS,
  DROP_FRAMES_DEFAULT,
  DROP_FRAMES_DECREMENT,
  LINE_CLEAR_BONUSES
} from '../constants/grid'

import { SHAPES, COLORS } from '../constants/tetronimo'
import { getRandomTetronimo, getInitialPositionForTetronimo } from '../lib/tetronimo'
import { generateEmptyGrid, rotate, isPositionAvailable, getBottomMostPosition, transferTetronimoGrid, clearLines, fitTetronimoPositionInWellBounds } from '../lib/grid'

// Why choose a Map of reducers, one for each state, instead of a single reducer with a switch case, this could a matter of taste(???)
const reducers = {
  ADVANCE: (state, action) => {
    const {
      score,
      lines,
      nextTetronimo,
      grid,
      activeTetronimo,
      activeTetronimoGrid,
      activeTetronimoPosition,
      dropAcceleration,
      dropFrames
    } = state
    const { rows } = action.payload

    let newPosition = Object.assign({}, activeTetronimoPosition, {
      y: activeTetronimoPosition.y + rows
    })

    // the active tetronimo keeps falling until it hits something,
    if (isPositionAvailable(grid, activeTetronimoGrid, newPosition)) {
      return Object.assign({}, state, {
        activeTetronimoPosition: newPosition
      })
    }

    // A big skip frame could cause the tetronimo to jump
    // more than one row, we need to ensure that it ends up
    // at the bottom most position if the jump caused the
    // tetronimo to land
    newPosition = getBottomMostPosition(grid, activeTetronimoGrid, newPosition)

    // this is when the active tetronimo hits the bottom
    // cof the grid and can no longer be ontrolled
    const newGrid = transferTetronimoGrid(grid,
        activeTetronimoGrid,
        newPosition,
        COLORS[activeTetronimo])

    // clear lines after landing and transferring a tetronimo
    const { clearedGrid, linesCleared } = clearLines(newGrid)

    // calculate cells in tetronimo, currently hardcoded to 4
    const cells = 4

    // rudimentary scoring logic, no T-Spin and combo bonuses,
    // Read more at http://tetris.wikia.com/wiki/Scoring
    let points = dropAcceleration ? cells * 2 : cells
    if (linesCleared) {
      points += LINE_CLEAR_BONUSES[linesCleared + 1] * (lines + 1)
    }

    // game over when well is full & and it should stop inserting any new
    // Tetrominoes from this point on (until the Well is reset)
    const gameState = newPosition.y < 0 ? STOPPED : PLAYING

    return Object.assign({}, state, {
      gameState,
      score: score + points,
      lines: lines + linesCleared,
      nextTetronimo: getRandomTetronimo(),
      grid: clearedGrid,
      activeTetronimo: nextTetronimo,
      activeTetronimoGrid: SHAPES[nextTetronimo],
      activeTetronimoPosition: getInitialPositionForTetronimo(nextTetronimo, WELL_COLS),
      // increase frames whenever a line is cleared
      dropFrames: linesCleared ? dropFrames - DROP_FRAMES_DECREMENT : dropFrames
    })
  },
  START: state => {
    const nextTetronimo = getRandomTetronimo()
    const activeTetronimo = getRandomTetronimo()
    const activeTetronimoGrid = SHAPES[activeTetronimo]
    const activeTetronimoPosition = getInitialPositionForTetronimo(activeTetronimo, WELL_COLS)

    return Object.assign({}, state, {
      gameState: PLAYING,
      score: 0,
      lines: 0,
      nextTetronimo,
      activeTetronimo,
      activeTetronimoGrid,
      activeTetronimoPosition,
      grid: generateEmptyGrid(WELL_ROWS, WELL_COLS),
      dropFrames: DROP_FRAMES_DEFAULT,
      dropAcceleration: false
    })
  },
  PAUSE: state => Object.assign({}, state, { gameState: PAUSED }),
  RESUME: state => Object.assign({}, state, { gameState: PLAYING }),
  MOVE: (state, action) => {
    const { grid, activeTetronimoGrid, activeTetronimoPosition } = state
    const { direction } = action.payload

    const newPosition = Object.assign({}, activeTetronimoPosition, {
      x: activeTetronimoPosition.x + direction
    })

    // Attempting to move the tetronimo outside the well bounds or over landed
    // tetronimos will be ignored
    if (!isPositionAvailable(grid, activeTetronimoGrid, newPosition)) {
      return state
    }

    return Object.assign({}, state, { activeTetronimoPosition: newPosition })
  },
  ROTATE: state => {
    const { grid, activeTetronimoGrid, activeTetronimoPosition } = state
    const newGrid = rotate(activeTetronimoGrid)

    // if rotation causes active tetronimo to move out of bounds of the well,
    // adjust position to fit inside the bounds
    const newPosition = fitTetronimoPositionInWellBounds(grid, newGrid, activeTetronimoPosition)

    // if rotation causes a collision with landed tetronimo, it won't be applied
    if (!isPositionAvailable(grid, newGrid, newPosition)) {
      return state
    }

    return Object.assign({}, {
      activeTetronimoGrid: newGrid,
      activeTetronimoPosition: newPosition
    })
  },
  ENABLE_ACCELERATION: state => Object.assign({}, state, { dropAcceleration: true }),
  DISABLE_ACCELERATION: state => Object.assign({}, state, { dropAcceleration: false })
}

// export default without naming it, why did'nt I think of that(???)
export default (state, action) => {
  if (typeof state === 'undefined') {
    return newGame.reduxState.game
  }

  return action.type in reducers ? reducers[action.type](state, action) : state
}
