const render = {
  app: document.querySelector('#app'),
  clean() {
    this.app.innerHTML = ''
  },
  home(data) {
    const filtered = data.artObjects.filter(painting => painting.headerImage.url)
    let counter = 0;
    const elements = filtered.map((painting, index) => {
      counter++;
      let group = ''
      if (counter === 1) {
        group += `<div class="painting-group">`
      }
      group += `<div class="painting">
            <a href="#${painting.objectNumber}">
              <figure>
                <img src="${painting.headerImage.url}" alt="${painting.longTitle} - Rijksmuseum Collection">
                <figcaption>
                  <h3>${painting.title}</h3>
                  <p>${painting.principalOrFirstMaker}</p>
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
    elements.push('<button>Volgende drie...</button>')
    this.app.innerHTML = elements.toString().split(',').join('')
    document.querySelectorAll('.painting-group')[0].classList.add('active')
  },
  detail(data) {
    const painting = data.artObject
    this.clean()
    console.log(painting)

    let colors = '<div class="color-blocks-holder">';
    for(let i = 0; i < painting.colors.length; i++){
      colors += `<div class="color-block" style="background-color: ${painting.colors[i]};">${painting.colors[i]}</div>`
    }
    colors += '</div>'

    this.app.innerHTML = `
      <div class="painting detail">
          <figure>
            <img src="${painting.webImage.url}" alt="${painting.longTitle} - Rijksmuseum Collection">
            <figcaption>
              ${painting.longTitle} - Rijksmuseum Collection
            </figcaption>
          </figure>
          <h3>${painting.title}</h3>
          <p>${painting.label.makerLine}</p>
          <p>${painting.label.description}</p>
          <p>${painting.principalOrFirstMaker}</p>
          ${colors}
      </div>
    `
  }
}

export default render
