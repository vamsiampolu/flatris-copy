import {SHAPES} from '../../../constants/tetronimo'
export default {
  props: {
    grid: [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, [1196, '#b04497'], null, null, null, null, null, null, null, null],
      [
        [1197, '#b04497'],
        [1198, '#b04497'],
        [1199, '#b04497'],
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    activeTetronimo: 'T',
    activeTetronimoGrid: SHAPES.T,
    activeTetronimoPosition: {
      x: 2,
      y: 13.508750000000028
    }
  }
}
