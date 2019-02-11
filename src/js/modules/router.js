import render from './render.js'

const router = {
  routes: [],
  hash() {
    return window.location.hash
  },
  add(name, href) {
    this.routes.push({name, href})
  },
  async init() {
    if (!window.location.hash) window.location.href = '#/'

    this.navigate(this.hash())

    window.addEventListener('hashchange', () => {
      this.navigate(this.hash())
    })
  },
  navigate(hash) {
    const hashParts = hash.split('/')
    let route, id

    if (hashParts.length > 2) {
      route = this.routes.find(route => route.href.indexOf(hashParts[1]) > -1)
      id = hashParts[2]
    } else {
      route = this.routes.find(route => route.href === hash.split('#')[1])
    }

    if (!route) return render.error('Unknown route')

    render[route.name.toLowerCase()](id)
  }
}

export default router
