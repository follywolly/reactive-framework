import Template from './template.js'

class Component extends Template {
  constructor(props){
    super()
    this.props = props
    this.state = {}
  }
  setState(state) {
    this.oldState = this.state
    this.state = Object.assign({}, this.state, state)
    // this.domHandler.update(parent, this.slider.setState({data: filtered}), this.slider.setState({data: previous}))
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
