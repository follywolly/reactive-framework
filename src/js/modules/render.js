import Data from './data.js'
import slider from './slider.js'

class Render {
  constructor(){
    this.data = new Data()
    this.app = document.querySelector('#app')
  }
  clean() {
    this.app.innerHTML = '<p>Loading...</p>'
  }
  error(text) {
    this.clean()
    this.app.innerHTML = `
      <div class="container">
        <h2>404</h2>
        <p>${text}</p>
      </div>
    `
  }
  title() {
    return '<h1>Kunststukken uit het Rijksmuseum</h1>'
  }
  footer() {
    return `
      <footer>
        made with the <a href="https://www.rijksmuseum.nl/en/api">Rijksmuseum API</a>
      </footer>
    `
  }
  async overview() {
    this.clean()
    const res = await this.data.getAll()
    const filtered = res.filter(painting => painting.headerSrc)
    let counter = 0;
    const elements = filtered.map((painting, index) => {
      counter++;
      let group = ''
      if (counter === 1) {
        group += `<div class="painting-group">`
      }
      group += `<div class="painting">
            <a href="#/paintings/${painting.number}">
              <figure>
                <img src="${painting.headerSrc}" alt="${painting.fullTitle} - Rijksmuseum Collection">
                <figcaption>
                  <h3>${painting.title}</h3>
                  <p>${painting.maker}</p>
                </figcaption>
              </figure>
            </a>
          </div>
      `
      if (counter === 3) {
        counter = 0
        group += `</div>`
      }
      return group
    })
    elements.push('</div></div><button id="slider-button">Volgende drie...</button>')
    const renderStr = '<main>' + this.title() + '<div class="paintingsholder">' + elements.toString().split(',').join('') + '</main>' + this.footer()
    this.app.insertAdjacentHTML('afterbegin', renderStr)
    document.querySelectorAll('.painting-group')[0].classList.add('active')
    slider()
  }
  async detail(id) {
    this.clean()

    const painting = await this.data.get(id)

    let colors = '<div class="color-blocks-holder">';
    for(let i = 0; i < painting.colors.length; i++){
      colors += `<div class="color-block" style="background-color: ${painting.colors[i]};">${painting.colors[i]}</div>`
    }
    colors += '</div>'

    const renderStr = `
      <main>
      ${this.title()}
        <div class="painting detail">
          <a href="#/" class="btn">Go back</a>
          <figure>
            <img src="${painting.src}" alt="${painting.longTitle} - Rijksmuseum Collection">
            <figcaption>
              ${painting.longTitle} - Rijksmuseum Collection
            </figcaption>
          </figure>
          <h3>${painting.title}</h3>
          <p>${painting.makerLine}</p>
          <p>${painting.description}</p>
          <p>${painting.maker}</p>
          ${colors}
        </div>
      </main>
      ${this.footer()}
    `
    this.app.insertAdjacentHTML('afterbegin', renderStr)
  }
}

export default Render
