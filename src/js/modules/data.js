const data = {
  settings: '?key=3jvQxuIu&format=json',
  endpoint: 'https://www.rijksmuseum.nl/api/nl/collection',
  url(insert = '', extras = '') {
    return this.endpoint + insert + this.settings + extras
  },
  all() {
    if (localStorage.getItem('data')) {
      return new Promise(resolve => resolve(JSON.parse(localStorage.getItem('data'))))
    }
    const url = this.url('', '&ps=100')
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(raw => raw.json())
        .then(data => {
          localStorage.setItem('data', JSON.stringify(data))
          return resolve(data)
        })
        .catch(err => reject(err))
    })
  },
  get(id) {
    if (localStorage.getItem(id)) {
      return new Promise(resolve => resolve(JSON.parse(localStorage.getItem(id))))
    }
    const url = this.url(`/${id}`)
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(raw => raw.json())
        .then(dirty => {
          const painting = dirty.artObject
          console.log(painting)
          return {
            webImage: painting.webImage,
            longTitle: painting.longTitle,
            title: painting.title,
            label: painting.label,
            principalOrFirstMaker: painting.principalOrFirstMaker,
            colors: painting.colors
          }
        })
        .then(painting => {
          localStorage.setItem(id, JSON.stringify(painting))
          return resolve(painting)
        })
        .catch(err => reject(err))
    })
  }
}
export default data
