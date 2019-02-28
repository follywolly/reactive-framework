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
    if (route.length) {
      route.forEach(route => this.routes.push(route))
    } else {
      this.routes.push(route)
    }
  }
  navigate(hash = this.hash()) {
    const params = hash.split('/')
    let route, param

    if (params.length > 2 && params[2] !== '') {
      // kind of crude check for detail page url
      route = this.routes.find(route => route.href.indexOf(params[1]) > -1)
      param = params[2]
    } else {
      route = this.routes.find(route => route.href === hash.split('#')[1])
      param = null
    }

    if (!route) {
      return this.render.error('404', 'Page not found')
    }
    if (param !== null && param.indexOf('-') === -1) {
      return this.render.error('401', 'Check if painting ID is valid. All ID\'s consist of letters, numbers and hyphens.')
    }
    return this.render.template({ // if route is found, render correct component
      temp: route.temp(param),
      callback: route.callback
    })
  }
}

export default Router
