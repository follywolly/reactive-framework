import render from './render.js'

const router = {
  href() {
    return window.location.href.split('#')[1]
  },
  async init() {
    if (window.location.href.indexOf('#') === -1) window.location.href += '#/'
    this.navigate(this.href())
    window.addEventListener('hashchange', () => {
      this.navigate(this.href())
    })
  },
  navigate(href) {
    const hrefParts = href.split('/')
    let route, id

    if (hrefParts.length > 2) {
      route = this.routes.find(route => route.href.indexOf(hrefParts[1]) > -1)
      id = hrefParts[2]
    } else {
      route = this.routes.find(route => route.href === href)
      id = ''
    }

    if (!route) return render.error('Unknown route')

    render[route.name.toLowerCase()](id)
  }
}

export default router
