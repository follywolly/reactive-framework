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
    this.id = this.store.unId
    this.store.commit('updateID')
    this.loading = false
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    const pre = this.build()
    pre.props['data-id'] = this.id
    this.domHandler.update(pre)
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
    return v('div', {'class': 'holder loading'},
      v('p', {}, 'Loading...')
    )
  }
  build() {
    return undefined
  }
}
export default Component
