class Data {
  constructor() {
    this.settings = '?key=3jvQxuIu&format=json'
    this.endpoint = 'https://www.rijksmuseum.nl/api/nl/collection'
  }
  url(insert = '', extras = '') {
    return this.endpoint + insert + this.settings + extras
  }
  template(painting) {
    return {
      number: painting.objectNumber,
      src: painting.webImage.url,
      fullTitle: painting.fullTitle,
      title: painting.title,
      maker: painting.principalOrFirstMaker,
      colors: painting.colors,
      description: painting.label.description,
      makerLine: painting.label.makerLine
    }
  }
  format(data) {
    // console.log(this.template(data.artObject))
    if (data.artObject) {
      // single object
      const painting = data.artObject
      return this.template(painting)
    }
    return data.artObjects.map(painting => ({
      number: painting.objectNumber,
      headerSrc: painting.headerImage.url,
      fullTitle: painting.fullTitle,
      title: painting.title,
      maker: painting.principalOrFirstMaker
    }))
  }
  request(name, url) {
    if (sessionStorage.getItem(name)) {
      return new Promise(resolve => resolve(JSON.parse(sessionStorage.getItem(name))))
    }
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(raw => raw.json())
        .then(json => this.format(json))
        .then(data => {
          sessionStorage.setItem(name, JSON.stringify(data))
          return resolve(data)
        })
        .catch(err => reject(err))
    })
  }
  getAll() {
    return this.request('data', this.url('', '&ps=20'))
  }
  get(id) {
    return this.request(id, this.url(`/${id}`))
  }
}
export default Data
