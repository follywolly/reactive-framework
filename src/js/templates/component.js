import Template from './template.js'

class Component extends Template {
  constructor(props){
    super()
    this.props = props
    this.state = {}
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    return this.build()
  }
  mounted() {
    return undefined
  }
  build() {
    return undefined
  }
}
export default Component
