'use strict'

// modules
import render from './modules/render.js'
import slider from './modules/slider.js'
import data from './modules/data.js'
import router from './modules/router.js'

(function() {
  data.all()
    .then(raw => raw.json())
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data))
      return data
    })
    .then(data => {
      render.home(data)
      slider()
      router.init()
    })
    .catch(err => {
      document.querySelector('#app').innerHTML = '<p class="error">You are offline</p>'
      console.log(err);
    })
})()
