import Data from './data.js'
import DOM from './dom.js'

class Render {
  constructor(){
    this.data = new Data()
    this.dom = new DOM()
    this.app = document.querySelector('#app')
  }
  clean() {
    this.app.innerHTML = ''
  }
  async template(config) {
    this.clean()
    const data = await this.data.request(config.name, config.urlConfig)
    this.app.appendChild(
      this.dom.create(
        config.temp.build(data)
      )
    )
    config.callbacks.forEach(cb => cb())
  }
}

export default Render
