import Data from './data.js'
import DOM from './dom.js'
import Overview from '../templates/overview.js'
import Detail from '../templates/detail.js'
import slider from './slider.js'

class Render {
  constructor(){
    this.data = new Data()
    this.dom = new DOM()
    this.app = document.querySelector('#app')
  }
  clean() {
    this.app.innerHTML = ''
  }
  error(text) {
    this.clean()
    this.app.innerHTML = `
      <div class="container">
        <h2>404</h2>
        <p>${text}</p>
      </div>
    `
  }
  async overview() {
    this.clean()
    const data = await this.data.getAll()
    const overview = new Overview(data)
    this.app.appendChild(
      this.dom.create(
        overview.template()
      )
    )
    slider()

  }
  async detail(id) {
    console.log('fired');
    this.clean()
    const data = await this.data.get(id)
    const detail = new Detail(data)
    this.app.appendChild(
      this.dom.create(
        detail.template()
      )
    )
  }
}

export default Render
