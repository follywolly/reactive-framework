'use strict'

// modules
import Router from './modules/router.js'

(() => {
  const router = new Router()
  router.add('Overview', '/')
  router.add('Detail', '/paintings/:id')
  router.add('Error', '/error')

  router.navigate()
})();
