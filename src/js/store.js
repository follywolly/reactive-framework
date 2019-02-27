const store = {
  state: {},
  setState(state) {
    this.state = Object.assign({}, this.state, state)
  },
  getState(key) {
    return this.state[key]
  }
}

export default store
