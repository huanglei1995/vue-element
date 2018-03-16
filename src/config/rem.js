(function (doc, win) {
  const docEi = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    var clientWidth = docEi.clientWidth
    if (!clientWidth) {
      return
    }
    docEi.style.fontSize = 20 * (clientWidth / 320) + 'px'
  }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
