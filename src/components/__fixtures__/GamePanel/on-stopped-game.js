import {STOPPED} from '../../../constants/states'

export default {
  props: {
    gameState: STOPPED,
    score: 0,
    lines: 0,
    nextTetronimo: null,
    onStart: () => console.log('Start'),
    onPause: () => console.log('Pause'),
    onResume: () => console.log('Resume')
  },
  // Activate Redux layout
  reduxState: {}
}
