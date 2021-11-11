export function loop(n, f) {
  const result = Array(n)
  for (let i = 0; i < n; ++i) {
    result[i] = f(i)
  }
  return result
}
