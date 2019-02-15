import Template from './template.js'

class Detail extends Template {
  constructor(data) {
    super()
    this.painting = data
  }
  template() {
    return this.domHandler.virtualize('div', {'class': 'holder'},
      this.domHandler.virtualize('h1', {}, 'Kunststukken uit het rijksmuseum'),
      this.domHandler.virtualize('div', {'class': 'painting detail'},
        this.domHandler.virtualize('a', {'href': '#/', 'class': 'btn'}, 'Return'),
        this.domHandler.virtualize('figure', {},
          this.domHandler.virtualize('img', {'src': this.painting.src, 'alt': `${this.painting.longTitle} - Rijksmuseum Collection`}),
          this.domHandler.virtualize('figcaption', {}, `${this.painting.longTitle} - Rijksmuseum Collection`)
        ),
        this.domHandler.virtualize('h3', {}, this.painting.title),
        this.domHandler.virtualize('p', {}, this.painting.makerLine),
        this.domHandler.virtualize('p', {}, this.painting.description),
        this.domHandler.virtualize('p', {}, this.painting.maker),
        this.domHandler.virtualize('div', {'class': 'color-blocks-holder'},
          ...this.painting.colors.map(color => this.domHandler.virtualize('div', {'class': 'color-block', 'style': `background-color: ${color}`}, color))
        )
      )
    )
  }
}

export default Detail
