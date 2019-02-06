'use strict'

function search(query) {
  const url = `https://www.rijksmuseum.nl/api/nl/collection?${query ? 'q='+query : ''}&key=3jvQxuIu&format=json&ps=100`
  return fetch(url)
}

function init() {
  search()
    .then(raw => raw.json())
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data))
      return data
    })
    .then(data => render(data))
    .catch(err => document.querySelector('#app').innerHTML = '<p class="error">You are offline</p>')
}

function render(data) {
  // const data = JSON.parse(localStorage.getItem('data'))
  console.log(data)
  const filtered = data.artObjects.filter(obj => obj.headerImage.url)
  let counter = 0;
  const elements = filtered.map((obj, index) => {
    counter++;
    if (counter === 1) {
      return `
        <div class="painting-group">
          <div class="painting">
            <a href="${obj.links.web}" target="_blank">
              <figure>
                <img src="${obj.headerImage.url}" alt="${obj.longTitle} - Rijksmuseum Collection">
                <figcaption>
                  <h3>${obj.title}</h3>
                  <p>${obj.principalOrFirstMaker}</p>
                </figcaption>
              </figure>

            </a>
          </div>
      `
    }
    if (counter === 3) {
      counter = 0;
      return `
          <div class="painting">
            <a href="${obj.links.web}" target="_blank">
              <figure>
                <img src="${obj.headerImage.url}" alt="${obj.longTitle} - Rijksmuseum Collection">
                <figcaption>
                  <h3>${obj.title}</h3>
                  <p>${obj.principalOrFirstMaker}</p>
                </figcaption>
              </figure>

            </a>
          </div>
        </div>
      `
    }
    return `
      <div class="painting">
        <a href="${obj.links.web}" target="_blank">
          <figure>
            <img src="${obj.headerImage.url}" alt="${obj.longTitle} - Rijksmuseum Collection">
            <figcaption>
              <h3>${obj.title}</h3>
              <p>${obj.principalOrFirstMaker}</p>
            </figcaption>
          </figure>

        </a>
      </div>
    `
  })
  const app = document.querySelector('#app')
  app.innerHTML = elements.toString().split(',').join('')
  document.querySelectorAll('.painting-group')[0].classList.add('active')
}

document.addEventListener('DOMContentLoaded', () => init())

document.querySelector('button').addEventListener('click', () => {
  const all = document.querySelectorAll('.painting-group')
  const selected = document.querySelector('.painting-group.active')
  all.forEach((element, index) => {
    if (element === selected) {
      selected.classList.remove('active')
      selected.classList.add('active-out')
      setTimeout(()=>selected.classList.remove('active-out'), 1000)
      if (all[index + 1]) {
        all[index + 1].classList.add('active')
      } else {
        all[0].classList.add('active')
      }
    }
  })
})
