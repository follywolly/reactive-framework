class DOM {
  constructor() {
  }
  virtualize(type, props, ...children) {
    return {type, props, children}
  }
  create(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    const el = document.createElement(node.type)
    this.setProps(el, node.props)

    node.children
      .map(child => this.create(child))
      .forEach(el.appendChild.bind(el))
    return el
  }
  setProps(node, props) {
    function setProp(target, name, value) {
      target.setAttribute(name, value)
    }
    Object.keys(props).forEach(name => {
      setProp(node, name, props[name])
    })
  }
}

export default DOM
