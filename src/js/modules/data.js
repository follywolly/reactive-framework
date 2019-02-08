const data = {
  key: '3jvQxuIu',
  all() {
    const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${this.key}&format=json&ps=100`
    return fetch(url)
  },
  get(id) {
    const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=${this.key}&format=json`
    return fetch(url)
  }
}
export default data
