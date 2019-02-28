class Store {
  constructor() {
    this.state = {}
    this.unId = 0
    this.cbs = []
  }
  listener(key, val) {
    this.cbs
      .filter(cb => cb[0] === key)
      .forEach(cb => cb[1](val))
  }
  commit(funcName) {
    return this[funcName]()
  }
  updateID(){
    this.unId = this.unId + 1
    console.log(this.unId);
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    for (const [key, val] of Object.entries(state)) {
      this.listener(key, val)
    }
  }
  getState(key) {
    return this.state[key]
  }
  watch(key, cb) {
    if (this.cbs.length < 1) {
      this.cbs.push([key, cb])
    } else {
      let alreadyIn = false
      this.cbs.forEach(arr => {
        if (arr[0] === key && arr[1].toString() === cb.toString()) {
          alreadyIn = true
        }
      })
      if (!alreadyIn) {
        this.cbs.push([key, cb])
      }
    }

  }
}

export default Store
