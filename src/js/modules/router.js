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
  add(route) {
    this.routes.push(route)
  }
  navigate(hash = this.hash()) {
    const hashParts = hash.split('/')
    let route, id


    if (hashParts.length > 2) {
      route = this.routes.find(route => route.href.indexOf(hashParts[1]) > -1)
      name = hashParts[2]
      route.urlConfig = {'insert': `/${name}`}
    } else {
      route = this.routes.find(route => route.href === hash.split('#')[1])
      name = route.name.toLowerCase()
    }

    if (!route) return this.render.error('Unknown route')

    if (!route.callbacks) route.callbacks = []
    this.render.template({...route, name})
  }
}

export default Router
