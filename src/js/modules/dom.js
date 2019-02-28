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
    const {type, props, children} = node

    if (typeof type === 'function') {
      // component / full template
      const component = new type(props)
      const pre = component.preBuild()
      pre.props['data-id'] = component.id
      const el = this.create(pre)
      setTimeout(() => component.mounted(), 0)
      return el
    }
    const el = document.createElement(type)
    this.setProps(el, props)

    children
      .map(child => this.create(child))
      .forEach(el.appendChild.bind(el))
    return el
  }
  setProps(node, props) {
    const setProp = (target, name, value) => {
      target.setAttribute(name, value)
    }
    for(const [key, value] of Object.entries(props)) {
      setProp(node, key, value)
    }
  }
  update(node) {
    const parent = document.querySelector(`[data-id="${node.props['data-id']}"]`).parentNode
    parent.innerHTML = ''
    parent.appendChild(this.create(node))
  }
}

export default DOM
