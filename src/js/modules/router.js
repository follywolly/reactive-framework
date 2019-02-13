import Render from './render.js'

class Router {
  constructor(){
    this.routes = []
    this.render = new Render()

    if (!window.location.hash) window.location.href = '#/'

    window.addEventListener('hashchange', () => {
      this.navigate(this.hash())
    })
  }
  hash() {
    return window.location.hash
  }
  add(name, href) {
    this.routes.push({name, href})
  }
  navigate(hash = this.hash()) {
    const hashParts = hash.split('/')
    let route, id


    if (hashParts.length > 2) {
      route = this.routes.find(route => route.href.indexOf(hashParts[1]) > -1)
      id = hashParts[2]
    } else {
      route = this.routes.find(route => route.href === hash.split('#')[1])
    }

    if (!route) return this.render.error('Unknown route')

    this.render[route.name.toLowerCase()](id)
  }
}

export default Router
