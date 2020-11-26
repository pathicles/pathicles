export const variableTexture = (
  regl,
  { width, height },
  type,
  data = undefined
) => {
  console.log(width, height)

  regl.texture({
    width,
    height,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type,
    data
  })
}
