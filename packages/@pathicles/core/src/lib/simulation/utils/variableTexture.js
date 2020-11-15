export const variableTexture = (
  regl,
  { width, height, channelsPerValueCount = 1 },
  type,
  data = undefined
) =>
  regl.texture({
    width,
    height: height * channelsPerValueCount,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type,
    data
  })
