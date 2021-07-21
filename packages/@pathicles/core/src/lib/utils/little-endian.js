export function isLittleEndian() {
  const uint8Array = new Uint8Array([0xaa, 0xbb])
  const uint16array = new Uint16Array(uint8Array.buffer)
  return uint16array[0] === 0xbbaa 
}
