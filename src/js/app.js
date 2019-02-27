'use strict'

// modules
import Router from './modules/router.js'
import Render from './modules/render.js'
import Detail from './templates/pages/detail.js'
import Overview from './templates/pages/overview.js'


const router = new Router()
const render = new Render()

router.add({
  href: '/',
  temp: () => new Overview,
  callback: () => console.log('callback')
})

router.add({
  href: '/paintings/:id',
  temp: (id) => new Detail({id}),
  callback: [
    () => console.log('callback 1'),
    () => console.log('callback 2')
  ]
})

router.navigate()
