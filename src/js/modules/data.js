const data = {
  settings: '?key=3jvQxuIu&format=json',
  endpoint: 'https://www.rijksmuseum.nl/api/nl/collection',
  url(insert = '', extras = '') {
    return this.endpoint + insert + this.settings + extras
  },
  all() {
    const url = this.url('', '&ps=100')
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(raw => raw.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  },
  get(id) {
    const url = this.url(`/${id}`)
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(raw => raw.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }
}
export default data
