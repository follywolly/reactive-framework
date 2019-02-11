'use strict'

// modules
import router from './modules/router.js'

router.add('Overview', '/')
router.add('Detail', '/paintings/:id')
router.add('Error', '/error')

router.init()
