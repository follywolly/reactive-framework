'use strict'

// modules
import Router from './modules/router.js'
import DOM from './modules/dom.js'
import Data from './modules/data.js'
import Overview from './templates/overview.js'

(() => {
  const router = new Router()
  router.add('Overview', '/')
  router.add('Detail', '/paintings/:id')
  router.add('Error', '/error')

  // router.navigate()
})();


(async () => {
  const dom = new DOM()
  const data = new Data()
  const root = document.querySelector('#app')

  const all = await data.getAll()
  const overview = new Overview(all)


  root.appendChild(
    dom.create(
      overview.template()
    )
  )
})();
