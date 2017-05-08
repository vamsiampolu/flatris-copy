import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {STOPPED, PLAYING, PAUSED} from '../constants/states'
import {SHAPES, COLORS} from '../constants/tetronimo'
import {attachPointerDown} from '../lib/events'

import Tetronimo from './Tetronimo'
import Button from './Button'

const GamePanelRoot = styled.div`
  color: #34495f;
  > p {
    margin: 0;
    line-height: 1em;
  }

  > button {
    position: absolute;
    margin: 0;
    padding: 0;
  }
`

const Title = styled.p`
  color: #34495f;
  font-weight: normal;
  line-height: 1.5em;
`

const Label = styled.p`
  color: #9ba4ab;
  font-weight: 300;
`

const Count = styled.p`
  margin: 0.16em 0 0 0;
  color: #3993d0;
  font-weight: normal;
`

const NextTetronimoContainer = styled.div`
  position: relative;
  transform: ${props => (props.nextTetronimo === 'I' ? 'translate(0, -25%)' : '')};

  & > ul > li > div {
    background-color: #ecf0f1 !important;
  }
`

class GamePanel extends React.Component {
  renderGameButton () {
    const {props} = this
    const {gameState, onStart, onPause, onResume, styles} = props

    let eventHandler
    let label
    switch (gameState) {
      case PLAYING:
        eventHandler = onPause
        label = 'Pause'
        break
      case PAUSED:
        eventHandler = onResume
        label = 'Resume'
        break
      default:
        eventHandler = onStart
        label = 'New Game'
    }

    return React.createElement(
      Button,
      {
        ...attachPointerDown(eventHandler),
        style: styles.button
      },
      label
    )
  }

  render () {
    const {props} = this
    const {score, lines, nextTetronimo, styles} = props
    const {
      root,
      title,
      label,
      count,
      nextTetronimo: nextTetronimoStyle
    } = styles
    return (
      <GamePanelRoot style={root}>
        <Title style={title}>Flatris</Title>
        <Label style={label}>Score</Label>
        <Count style={count}>{score}</Count>
        <Label style={label}>Lines cleared</Label>
        <Count style={count}>{lines}</Count>
        <Label style={label}>Next shape</Label>
        {nextTetronimo
          ? <NextTetronimoContainer style={nextTetronimoStyle}>
              <Tetronimo
                key={nextTetronimo}
                color={COLORS[nextTetronimo]}
                grid={SHAPES[nextTetronimo]}
              />
            </NextTetronimoContainer>
          : null}
        {this.renderGameButton()}
      </GamePanelRoot>
    )
  }
}

const {string, number, func, oneOf} = PropTypes

GamePanel.propTypes = {
  gameState: oneOf([STOPPED, PLAYING, PAUSED]).isRequired,
  score: number.isRequired,
  lines: number.isRequired,
  nextTetronimo: string,
  onStart: func.isRequired,
  onPause: func.isRequired,
  onResume: func.isRequired
}

const getStyles = layout => {
  const {blockSize, fontSize, side} = layout
  const {padding} = side
  const {title, count, button} = fontSize
  const defaultFontSize = fontSize['default']
  return {
    root: {
      padding: `0 ${padding}px`
    },
    title: {
      fontSize: title,
      paddingTop: padding
    },
    label: {
      fontSize: defaultFontSize,
      paddingTop: padding
    },
    count: {
      fontSize: count
    },
    nextTetronimo: {
      width: blockSize * 4,
      height: blockSize * 4,
      marginTop: padding / 3
    },
    button: {
      bottom: padding,
      left: padding,
      width: blockSize * 4,
      height: blockSize * 2,
      fontSize: button,
      lineHeight: `${blockSize * 2}px`
    }
  }
}

const mapStateToProps = state => {
  const {layout} = state
  return {
    styles: getStyles(layout)
  }
}

export default connect(mapStateToProps)(GamePanel)
