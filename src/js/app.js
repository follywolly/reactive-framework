'use strict'

// modules
import render from './modules/render.js'
import data from './modules/data.js'
import router from './modules/router.js'

router.routes = [
  {
    name: 'Overview',
    href: '/'
  },
  {
    name: 'Detail',
    href: '/paintings'
  },
  {
    name: 'Error',
    href: '/error'
  }
]
router.init()
