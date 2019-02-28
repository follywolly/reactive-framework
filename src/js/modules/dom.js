class DOM {
  constructor() {
  }
  virtualize(type, props, ...children) {
    return {type, props, children} // make js object tree from function calls from components build() functions
  }
  create(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    const {type, props, children} = node

    if (typeof type === 'string' && !props) { // if only text is entered in the virtualize function, render text
      return document.createTextNode(type)
    }
    if (typeof type === 'function') { // component / full template
      const component = new type(props)
      const el = this.create(component.preBuild())
      setTimeout(() => component.mounted(), 0) // fire cb after everything has rendered
      return el
    }
    const el = document.createElement(type)
    this.setProps(el, props)

    children
      .map(child => this.create(child)) // recursively make all the children
      .forEach(el.appendChild.bind(el)) // bind is necessary since it renders on itself
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
  update(comp) {
    const node = comp.preBuild()
    const el = document.querySelector(`[data-id="${node.props['data-id']}"]`)

    if (!el) return console.error('Element you\'re trying to update doesn\'t exist')

    const parent = el.parentNode
    parent.innerHTML = ''
    parent.appendChild(this.create(node))

    setTimeout(() => comp.mounted(), 0)
  }
}

export default DOM
