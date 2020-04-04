/* eslint-env browser */

export default function saveCanvas(canvasElement, fileName, format = 'png') {
  let MIME_TYPE, FILE_EXTENTION

  if (format.toLowerCase() === 'png') {
    MIME_TYPE = 'image/png'
    FILE_EXTENTION = 'png'
  } else if (format.toLowerCase() === 'webp') {
    MIME_TYPE = 'image/webp'
    FILE_EXTENTION = 'webp'
  } else if (format.toLowerCase() === 'gif') {
    MIME_TYPE = 'image/gif'
    FILE_EXTENTION = 'gif'
  } else {
    MIME_TYPE = 'image/jpeg'
    FILE_EXTENTION = 'jpg'
  } // IE11, Edge browser

  if (navigator.msSaveOrOpenBlob) {
    const blob = canvasElement.msToBlob(MIME_TYPE, 1)
    window.navigator.msSaveBlob(blob, fileName + '.' + FILE_EXTENTION)
  } // Other browser
  else {
    const imgURL = canvasElement.toDataURL(MIME_TYPE, 1)
    const a = document.createElement('a')
    a.download = fileName + '.' + FILE_EXTENTION
    a.href = imgURL
    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
