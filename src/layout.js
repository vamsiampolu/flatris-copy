import { WELL_ROWS, WELL_COLS } from './constants/grid'

const SIDE_COLS = 6
const GAME_COLS = WELL_COLS + SIDE_COLS
const { floor, round } = Math

const roundToMultiOf = (value, multiOf) => multiOf === undefined ? value : multiOf * round(value / multiOf)

export default ({width, height}) => {
  let blockSize = floor(height / (WELL_ROWS + 3))
  let gameWidth = blockSize * GAME_COLS

  if (gameWidth > width) {
    blockSize = floor(width / GAME_COLS)
    gameWidth = blockSize * GAME_COLS
  }

  // show preview in landscape mode alongside game
  const landscape = width >= gameWidth * 2

  // values relative to block size of 30px
  const getRelSize = (relValue, multiOf = 1) => roundToMultiOf(relValue * (blockSize / 30), multiOf)

  const controls = {
    size: blockSize * 2,
    padding: getRelSize(20)
  }

  return {
    width,
    height,
    blockSize,
    landscape,
    fontSize: {
      'default': getRelSize(14),
      text: getRelSize(20),
      button: getRelSize(18),
      control: getRelSize(24),
      title: getRelSize(40),
      count: getRelSize(30)
    },
    root: {
      width: gameWidth,
      height: blockSize * WELL_ROWS + 2 * blockSize + 2 * controls.padding
    },
    well: {
      width: blockSize * WELL_COLS,
      height: blockSize * WELL_ROWS
    },
    side: {
      width: blockSize * SIDE_COLS,
      height: blockSize * WELL_ROWS,
      padding: getRelSize(30)
    },
    controls,
    code: {
      padding: getRelSize(15),
      fontSize: getRelSize(12, 2)
    }
  }
}
