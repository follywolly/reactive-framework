'use strict'

// modules
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
