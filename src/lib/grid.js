export const generateEmptyGrid = (rows, cols) => {
  const matrix = []
  for (let row = 0; row < rows; row++) {
    if (matrix[row] == null) {
      matrix[row] = []
    }
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = null
    }
  }
  return matrix
}

export const rotate = grid => {
  const matrix = []
  const rows = grid.length
  const cols = grid[0].length
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = grid[cols - 1 - col][row]
    }
  }
  return matrix
}

export const getExactPosition = ({x, y}) => {
  return {x: Math.floor(x), y: Math.floor(y)}
}

export const isPositionAvailable = (grid, tetronimoGrid, position) => {
  const rows = grid.length
  const cols = grid[0].length
  const tetronimoRows = tetronimoGrid.length
  const tetronimoCols = tetronimoGrid[0].length
  const tetronimoPositionInGrid = getExactPosition(position)

  let relativeRow
  let relativeCol

  for (let row = 0; row < tetronimoRows; row++) {
    for (let col = 0; col < tetronimoCols; col++) {
      // ignore empty positions within the tetronimo
      if (tetronimoGrid[row][col]) {
        relativeRow = tetronimoPositionInGrid.y + row
        relativeCol = tetronimoPositionInGrid.x + col

        // Ensure tetronimo is within the horizontal bounds
        if (relativeCol < 0 || relativeCol >= cols) {
          return false
        }

        // Check if tetronimo hit the bottom of the well
        if (relativeRow >= rows) {
          return false
        }

        // Tetronimo are accepted at the top of the well
        if (relativeRow >= 0) {
          if (grid[relativeRow][relativeCol]) {
            return false
          }
        }
      }
    }
  }

  return true
}

export const getBottomMostPosition = (grid, tetronimoGrid, position) => {
  let y = Math.floor(position.y)
  while (!isPositionAvailable(grid, tetronimoGrid, {x: position.x, y})) {
    y = y - 1
  }
  return Object.assign({}, position, {y})
}

const createEmptyLine = cols => [...Array(cols)].map(() => null)
const isLine = row => !row.some(cell => cell === null)

export const clearLines = grid => {
  /**
   * Clear all rows that form a complete line, from one left to right, inside
   * the Well grid. Gravity is applied to fill in the cleared lines with the
   * ones above, thus freeing up the Well for more Tetrominoes to enter.
   */
  const rows = grid.length
  const cols = grid[0].length
  const clearedGrid = grid.map(l => l)
  let linesCleared = 0
  for (let row = rows - 1; row >= 0; row--) {
    if (isLine(clearedGrid[row])) {
      for (let row2 = row; row2 >= 0; row2--) {
        clearedGrid[row2] = row2 > 0
          ? clearedGrid[row2 - 1]
          : createEmptyLine(cols)
      }
      linesCleared++

      row++
    }
  }

  return {clearedGrid, linesCleared}
}

export const fitTetronimoPositionInWellBounds = (
  grid,
  tetronimoGrid,
  position
) => {
  const {x, y} = position
  const cols = grid[0].length
  const tetronimoRows = tetronimoGrid.length
  const tetronimoCols = tetronimoGrid[0].length
  let newX = x
  let relativeCol
  for (let row = 0; row < tetronimoRows; row++) {
    for (let col = 0; col < tetronimoCols; col++) {
      if (tetronimoGrid[row][col]) {
        relativeCol = newX + col

        // Wall kick: A Tetromino grid that steps outside of the Well grid will
        // be shifted slightly to slide back inside the Well grid
        if (relativeCol < 0) {
          newX = newX - relativeCol
        } else if (relativeCol >= cols) {
          newX -= relativeCol - cols + 1
        }
      }
    }
  }

  return {x: newX, y}
}
