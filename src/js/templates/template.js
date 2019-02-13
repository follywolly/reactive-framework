import DOM from '../modules/dom.js'
import Data from '../modules/data.js'
import Helper from '../modules/helper.js'

class Template {
  constructor(){
    this.domHandler = new DOM()
    this.helper = new Helper()
    this.data = new Data()
  }
}
export default Template
