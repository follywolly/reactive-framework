'use strict'

// modules
import Router from './modules/router.js'
import Render from './modules/render.js'
import Detail from './templates/detail.js'
import Overview from './templates/overview.js'
import slider from './modules/slider.js'


(() => {
  const router = new Router()
  const render = new Render()
  router.add('/', () => {
    render.template({
      name: 'Overview',
      temp: new Overview(),
      urlConfig: {'adjacent': '&ps=20'},
      callbacks: [slider]
    })
  })

  router.add('/paintings/:id', (id) => {
    render.template({
      name: id,
      temp: new Detail(),
      urlConfig: {'insert': `/${id}`},
      callbacks: []
    })
  })
  // router.add('Error', '/error')
  router.navigate()
})();
