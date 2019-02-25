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
      // component
      const component = new type(props)
      const el = this.create(component.build())
      component.base = el
      setTimeout(()=>{component.mounted()}, 0)
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
    function setProp(target, name, value) {
      target.setAttribute(name, value)
    }
    Object.keys(props).forEach(name => {
      setProp(node, name, props[name])
    })
  }
  component(cls, data = null) {
    const cmp = new cls()
    return cmp.build(data)
  }
  changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
     typeof node1 === 'string' && node1 !== node2 ||
     node1.type !== node2.type
  }
  update(parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
      parent.appendChild(
        this.create(newNode)
      )
    } else if (!newNode) {
      // console.log(parent.childNodes, oldNode, index);
      console.log(parent.childNodes, oldNode, index)
      parent.removeChild(
        parent.childNodes[index]
      )
    } else if (this.changed(newNode, oldNode)) {
      parent.replaceChild(
        this.create(newNode),
        parent.childNodes[index]
      )
    } else if (newNode.type) {
      const newLength = newNode.children.length
      const oldLength = oldNode.children.length
      // if (oldLength > newLength) {
      //   const crop = oldLength - newLength
      //   const children = [...oldNode.children].slice(-1, crop)
      //   children.forEach(child => oldNode.removeChild(child))
      // }
      for (let i = 0; i < oldLength || i < newLength; i++) {
        this.update(
          parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        )
      }
    }
  }
}

export default DOM
