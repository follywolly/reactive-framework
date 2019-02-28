'use strict'

const store = {
  state: {
    unId: 0
  },
  setState(state) {
    this.state = Object.assign({}, this.state, state)
  },
  getState(key) {
    return this.state[key]
  }
}

export default store
