import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.pre`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Monaco, "Lucida Console", monospace;
`

const gridPattern = /\n([\s]+)"(grid|activeTetrominoGrid)": ([\s\S]+?)(\]([\s]+)\],[\s]+")/g

/*
 * remove all unnesecary indentation
 * replace the nested array with the color of tetronimo in the position
*/
const prettifyGrid = (grid, indent) => {
  // captures the string [  222,   "#ffffff" ]
  // the value of each array item is a capturing group
  // the first capturing group is the number, the second is the color
  const gridItemPattern = /\[[\s]+([0-9]+),[\s\n]+("#[a-z0-9]{6}")[\n\s]+\]/g
  return (
    grid
      // Smoke & mirrors!
      .replace(gridItemPattern, '$2')
      .replace(new RegExp('\\[\n' + indent + '    ', 'g'), '[ ')
      .replace(new RegExp(',\n' + indent + '    ', 'g'), ', ')
      .replace(new RegExp('\n' + indent + '  (\\]|$)', 'g'), ' $1')
  )
}

const prettifyState = state => {
  /**
   * This ugly method styles the indenting of the stringified state JSON.
   */
  // Style the Well and the active Tetromino grid with one row per line
  // the tricky part
  return JSON.stringify(state, null, '  ').replace(
    gridPattern,
    (match, indent, key, grid, after) =>
      `\n${indent}"${key}": ${prettifyGrid(grid, indent)}${after}`
  )
}

/**
 * Render the prettified, serialized state of a Flatris instance.
 */
const FlatrisStatePreview = ({state, styles}) => {
  return (
    <Wrapper style={styles.root}>
      {prettifyState(state)}
    </Wrapper>
  )
}

const getStyles = ({code}) => ({
  root: {
    fontSize: code.fontSize,
    padding: code.padding
  }
})

const mapStateToProps = ({game, layout}) => ({
  state: game,
  styles: getStyles(layout)
})

export default connect(mapStateToProps)(FlatrisStatePreview)
