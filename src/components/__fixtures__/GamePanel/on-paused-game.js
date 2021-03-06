import {PAUSED} from '../../../constants/states'

export default {
  props: {
    gameState: PAUSED,
    score: 999,
    lines: 123,
    nextTetronimo: 'I',
    onStart: () => console.log('Start'),
    onPause: () => console.log('Pause'),
    onResume: () => console.log('Resume')
  },
  // Activate Redux layout
  reduxState: {}
}
