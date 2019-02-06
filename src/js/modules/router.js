import render from './render.js'
import data from './data.js'

const router = {
  init() {
    const links = document.querySelectorAll('a[href*="#"]')
    links.forEach(link => {
      const id = link.href.split('#')[1]
      link.addEventListener('click', (e) => {
        e.preventDefault()
        data.get(id)
          .then(raw => raw.json())
          .then(painting => render.detail(painting))
      })
    })
  }
}

export default router
