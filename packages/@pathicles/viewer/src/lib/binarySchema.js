const Type = require('js-binary').Type
export const binarySchema = new Type({
  tick: 'uint',
  data: {
    position: ['int'],
    particleTypes: ['uint']
  }
})
