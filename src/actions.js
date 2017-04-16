import raf from 'raf'

import { STOPPED, PLAYING } from './constants/states'
import { DROP_FRAMES_ACCELERATED } from './constants/grid'

const FPS = 60
const frameDuration = 1000 / FPS

let animationHandle
let timeBegin
let yProgress

const cancelFrame = () => {
  raf.cancel(animationHandle)
}

const now = typeof global.performance !== 'undefined' && typeof global.performance.now === 'function'
? global.performance.now()
  : Date.now()

const scheduleFrame = cb => () => {
  timeBegin = now()
  raf(() => {
    const timeEnd = now()
    cb((timeEnd - timeBegin) / frameDuration)
  })
}

// actions
export const ADVANCE = 'ADVANCE'
export const START = 'START'
export const PAUSE = 'PAUSE'
export const MOVE = 'MOVE'
export const ENABLE_ACCELERATION = 'ENABLE_ACCELERATION'
export const DISABLE_ACCELERATION = 'DISABLE_ACCELERATION'

// action-creators
export const advance = () => (dispatch, getState) => {
  cancelFrame()
  scheduleFrame(frames => {
    const {
      gameState,
      dropAcceleration,
      dropFrames
    } = getState().game

    if (gameState === STOPPED) { return }

    const framesPerDrop = dropAcceleration
    ? DROP_FRAMES_ACCELERATED
    : dropFrames

    yProgress += frames / framesPerDrop

    if (yProgress > 1) {
      dispatch({
        type: ADVANCE,
        payload: { rows: Math.floor(yProgress) }
      })
      // divides yProgress by 1 and assigns the result to yProgress, is equivalent to yProgress = 0(??)
      // if value is a floating point, it leaves the decimal part of the number, is that the intention here
      yProgress %= 1
    }

    dispatch(advance())
  })
}

export const load = () => (dispatch, getState) => {
  if (getState().game.gameState === PLAYING) {
    dispatch(advance())
  }
}

export const start = () => dispatch => {
  dispatch({ type: START })
  dispatch(advance())
}

export const resume = () => dispatch => {
  dispatch({ type: PAUSE })
  cancelFrame()
}

export const moveLeft = () => ({
  type: MOVE,
  payload: {
    direction: -1
  }
})

export const moveRight = () => ({
  type: MOVE,
  payload: { direction: 1 }
})

export const enableAcceleration = () => ({
  type: ENABLE_ACCELERATION
})

export const disableAcceleration = () => ({
  type: DISABLE_ACCELERATION
})
