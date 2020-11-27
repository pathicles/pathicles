export const variableTexture = (
  regl,
  { width, height },
  type,
  data = undefined
) =>
  regl.texture({
    width,
    height,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type,
    data
  })
