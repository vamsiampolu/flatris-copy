import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {STOPPED, PAUSED, PLAYING} from '../constants/states'
import {UP, DOWN, LEFT, RIGHT} from '../constants/keys'
import {attachPointerDownEvent, attachPointerUpEvent} from '../lib/events'

import {
  load,
  start,
  pause,
  resume,
  moveLeft,
  moveRight,
  rotate,
  enableAcceleration,
  disableAcceleration
} from '../actions'

import GamePanel from './GamePanel'
import InfoPanel from './InfoPanel'
import Button from './Button'

const FlatrisGameContainer = styled.div`
  position: relative;
  margin: 0 auto;
  font-family: Helvetica, Arial, sans-serif;
`

const WellContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #ecf0f1;
`

const InfoPanelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(236, 240, 241, 0.85);
`

const GamePanelContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
`

// the CSS here contains a state machine,
// writing and getting away with code like this
// should be much harder and must have more
// checks and balances, sometimes I hate styled-
// components so much because it gives you
// back the power to shoot yourself in the foot
const ControlButton = styled(Button)`
  position: absolute;
  top: 0;
  background: #ecf0f1;
  color: #34495f;
  > svg {
    fill: #34495f;
  }

  &:nth-child(1) {
    left: 0;
  }

  &:nth-child(1) > svg {
    transform-origin: 50% 50%;
    transform: scale(-1,1);
  }

  &:nth-child(2) {
    left: 26.67%;
  }

  &:nth-child(3) {
    right: 26.67%;
  }

  &:nth-child(4) {
    right: 0;
  }
`

export default class FlatrisGame extends React.Component {
  constructor (props) {
    super(props)
  }

  isGameRunning () {
    return this.props.gameState === PLAYING
  }

  componentDidMount () {}

  componentWillUnmount () {}

  onKeyUp (e) {
    if (!this.isGameRunning()) {
      return
    }

    if (e.keyCode === DOWN) {
      this.props.onDisableAcceleration()
    }
  }

  onKeyDown (e) {
    const keys = [UP, DOWN, LEFT, RIGHT]
    if (keys.indexOf(e.keyCode) !== -1) {
      e.preventDefault()
    }

    if (!this.isGameRunning()) {
      return
    }

    const {onEnableAcceleration, onRotate, onMoveLeft, onMoveRight} = this.props

    switch (e.keyCode) {
      case DOWN:
        onEnableAcceleration()
        break
      case UP:
        onRotate()
        break
      case LEFT:
        onMoveLeft()
        break
      case RIGHT:
        onMoveRight()
        break
      default:
    }
  }

  onRotatePress (e) {
    if (!this.isGameRunning()) {
      return
    }

    e.preventDefault()
    this.props.onRotate()
  }

  onLeftPress (e) {
    if (!this.isGameRunning()) {
      return
    }
    e.preventDefault()
    this.props.onMoveLeft()
  }

  onRightPress (e) {
    if (!this.isGameRunning()) {
      return
    }
    e.preventDefault()
    this.props.onMoveRight()
  }

  onPullPress (e) {
    if (!this.isGameRunning()) {
      return
    }
    e.preventDefault()
    this.props.onDisableAcceleration()
  }

  renderInfoPanel () {
    const {gameState, styles} = this.props
    return gameState === PLAYING
      ? null
      : <InfoPanelContainer style={styles.infoPanel}>
          <InfoPanel />
        </InfoPanelContainer>
  }

  renderControlIcon (path) {
    const {styles} = this.props
    return (
      <svg style={styles.controlIcon} viewBox='0 0 24 24'>
        <path d={path} />
      </svg>
    )
  }

  renderControls () {}

  render () {
    return <div />
  }
}
