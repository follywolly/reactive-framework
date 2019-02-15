import Data from './data.js'
import DOM from './dom.js'
import ErrorTemp from '../templates/error.js'

class Render {
  constructor(){
    this.data = new Data()
    this.dom = new DOM()
    this.app = document.querySelector('#app')
    this.errorTemp = new ErrorTemp()
  }
  clean() {
    this.app.innerHTML = ''
  }
  error(code, msg) {
    this.clean()
    this.app.appendChild(
      this.dom.create(
        this.errorTemp.build(code, msg)
      )
    )
  }
  async template(config) {
    this.clean()
    let data
    try {
      data = await this.data.request(config.name, config.urlConfig)
      this.app.appendChild(
        this.dom.create(
          config.temp.build(data)
        )
      )
      config.callbacks.forEach(cb => cb())
    } catch (e) {
      console.log(e)
      this.error('404', 'Page not found')
    }

  }
}

export default Render
