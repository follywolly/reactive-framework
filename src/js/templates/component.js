import DOM from '../modules/dom.js'
import Helper from '../modules/helper.js'
import store from '../store.js'

class Component {
  constructor(props){
    this.domHandler = new DOM()
    this.helper = new Helper()
    this.store = store
    this.props = props
    this.state = {}
    this.id = 0
    this.loading = false
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.domHandler.update(this.build())
    setTimeout(() => this.mounted(), 0)
  }
  preBuild() {
    return this.loading ? this.loader() : this.build()
  }
  mounted() {
    return undefined
  }
  loader() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'holder loading', 'data-id': this.id},
      v('p', {}, 'Loading...')
    )
  }
  build() {
    return undefined
  }
}
export default Component
