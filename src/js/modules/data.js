'use strict'

const settings = '?key=3jvQxuIu&format=json'
const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection'

const url = (params = {}) => {
  params.insert = params.insert || ''
  params.adjacent = params.adjacent || ''
  return endpoint + params.insert + settings + params.adjacent
}
const detailTemp = painting => {
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
const overviewTemp = painting => {
  return {
    number: painting.objectNumber,
    headerSrc: painting.headerImage.url,
    fullTitle: painting.fullTitle,
    title: painting.title,
    maker: painting.principalOrFirstMaker
  }
}
const format = data => {
  if (data.artObject) {
    // single painting
    const painting = data.artObject
    return detailTemp(painting)
  }
  // all paintings
  return data.artObjects.map(painting => overviewTemp(painting))
}
const request = (name, urlConfig) => {
  const reqUrl = url(urlConfig)
  if (sessionStorage.getItem(name)) {
    return new Promise(resolve => resolve(JSON.parse(sessionStorage.getItem(name))))
  }
  return new Promise((resolve, reject) => {
    fetch(reqUrl)
      .then(raw => raw.json())
      .then(json => format(json))
      .then(data => {
        sessionStorage.setItem(name, JSON.stringify(data))
        resolve(data)
      })
      .catch(err => reject(err))
  })
}
export default request
