'use strict'

// modules
import Router from './modules/router.js'
import Detail from './templates/detail.js'
import Overview from './templates/overview.js'
import slider from './modules/slider.js'


(() => {
  const router = new Router()
  router.add({
    name: 'Overview',
    href: '/',
    temp: new Overview(),
    urlConfig: {'adjacent': '&ps=20'},
    callbacks: [slider]
  })

  router.add({
    name: 'Detail',
    href: '/paintings/:id',
    temp: new Detail()
  })
  // router.add('Error', '/error')
  router.navigate()
})();
