import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

/**
 * synchronize the scroll position among `els`
 * @param  {DOM[]}  els
 * @param  {Func}   callback({ top, left })
 */
export default function (els, callback) {
  let currentDriver
  
  els.forEach((me, idx) => {
    let others = els.slice()
    others.splice(idx, 1) // exclude me
    syncScroll($(me), $(others))
  })
  
  function syncScroll(me, others) {
    me
      .on('scroll', throttle(() => {
        if (currentDriver && currentDriver !== me) return

        currentDriver = me
        let top = me.scrollTop()
        let left = me.scrollLeft()
        others.scrollTop(top).scrollLeft(left)
        callback({ top, left })
      }))
      // scroll stops
      .on('scroll', debounce(() => {
        currentDriver = null
      }, 100))
  }
}
