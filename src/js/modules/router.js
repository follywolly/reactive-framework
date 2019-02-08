import render from './render.js'
import data from './data.js'

const router = {
  init() {
    window.addEventListener('hashchange', () => {
      const id = window.location.href.split('#')[1]
      data.get(id)
        .then(raw => raw.json())
        .then(painting => render.detail(painting))
    })
  }
}

export default router
