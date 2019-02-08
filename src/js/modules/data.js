const data = {
  settings: '?key=3jvQxuIu&format=json',
  endpoint: 'https://www.rijksmuseum.nl/api/nl/collection',
  url(insert = '', extras = '') {
    return this.endpoint + insert + this.settings + extras
  },
  all() {
    const url = this.url('', '&ps=100')
    return fetch(url)
  },
  get(id) {
    const url = this.url(`/${id}`)
    return fetch(url)
  }
}
export default data
