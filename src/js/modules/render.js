import DOM from './dom.js'
import ErrorTemp from '../templates/pages/error.js'

class Render {
  constructor(){
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
    this.app.appendChild(
      this.dom.create(
        config.temp.preBuild()
      )
    )
    config.temp.mounted()
    if (config.callback){
      if (config.callback.length) {
        // array of functions passed in
        config.callback.forEach(cb => cb())
      } else {
        // function
        config.callback()
      }
    }
  }
}

export default Render
