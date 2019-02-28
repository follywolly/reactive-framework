class Store {
  constructor() {
    this.state = {}
    this.unId = 0
    this.cbs = []
  }
  listener(key, val) {
    this.cbs
      .filter(cb => cb[0] === key) // if updated key is being watched, call that watcher's callback
      .forEach(cb => cb[1](val))
  }
  commit(funcName) {
    return this[funcName]()
  }
  updateID(){
    this.unId = this.unId + 1
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    for (const [key, val] of Object.entries(state)) {
      this.listener(key, val) // call all watchers since general state has changed
    }
  }
  getState(key) {
    return this.state[key]
  }
  watch(key, cb, id = 0) {
    // expects a key to watch from the store state, a callback to fire after it changes and the id of the component that watches it.
    // (id is needed to prevent different instances of components getting in the way of eachother)
    if (this.cbs.length < 1) { // no watches yet? add the watch.
      this.cbs.push([key, cb, id])
    } else {
      let alreadyIn = false
      this.cbs.forEach(arr => {
        if (arr[0] === key && arr[1].toString() === cb.toString()) {
          alreadyIn = arr // if the to be watched key and to be fired callback are identical to something already in the callbacks, don't add it
        }
      })
      if (alreadyIn) {
        if (id !== alreadyIn[2]) { // but if the ID is different, remove the old watcher and replace with the new one (prevents problems with switching between routes)
          const index = this.cbs.indexOf(alreadyIn)
          this.cbs[index] = [key, cb, id]
        }
      } else { // if watcher doesn't exist yet it can be added safely
        this.cbs.push([key, cb, id])
      }
    }

  }
}

export default Store
