import Template from './template.js'

class Overview extends Template {
  constructor(data) {
    super()
    this.slices = this.helper.chunk(data, 3)
  }
  template() {
    return this.domHandler.virtualize('div', {'class': 'holder'},
      this.domHandler.virtualize('h1', {}, 'Kunststukken uit het rijksmuseum'),
      this.domHandler.virtualize('div', {'class': 'paintingsholder'},
        ...this.slices.map((slice, i) => {
          return this.domHandler.virtualize('div', {'class': i == 0 ? 'painting-group active' : 'painting-group'},
          ...slice.map(painting =>
              this.domHandler.virtualize('div', {'class': 'painting'},
                this.domHandler.virtualize('a', {'href': `#/paintings/${painting.number}`},
                  this.domHandler.virtualize('figure', {},
                    this.domHandler.virtualize('img', {'src': painting.headerSrc}, ''),
                    this.domHandler.virtualize('figcaption', {},
                      this.domHandler.virtualize('h3', {}, painting.title),
                      this.domHandler.virtualize('p', {}, painting.maker)
                    )
                  )
                )
              )
            )
          )
        })

      ),
      this.domHandler.virtualize('button', {'id': 'slider-button'}, 'Volgende drie...')
    )
  }
}

export default Overview
