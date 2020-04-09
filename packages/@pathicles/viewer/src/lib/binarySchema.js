import { Type } from 'js-binary'
export const binarySchema = new Type({
  tick: 'uint',
  data: {
    position: ['int'],
    particleTypes: ['uint']
  }
})
