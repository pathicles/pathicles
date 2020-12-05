export const variableTexture = (
  regl,
  { width, height },
  numberType,
  data = undefined
) =>
  regl.texture({
    width,
    height,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type: numberType,
    data
  })
