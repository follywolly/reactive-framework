import Template from './template.js'

class Detail extends Template {
  constructor() {
    super()
  }
  build(painting) {
    return this.domHandler.virtualize('div', {'class': 'holder'},
      this.domHandler.virtualize('h1', {}, 'Kunststukken uit het rijksmuseum'),
      this.domHandler.virtualize('div', {'class': 'painting detail'},
        this.domHandler.virtualize('a', {'href': '#/', 'class': 'btn'}, 'Return'),
        this.domHandler.virtualize('figure', {},
          this.domHandler.virtualize('img', {'src': painting.src, 'alt': `${painting.longTitle} - Rijksmuseum Collection`}),
          this.domHandler.virtualize('figcaption', {}, `${painting.longTitle} - Rijksmuseum Collection`)
        ),
        this.domHandler.virtualize('h3', {}, painting.title),
        this.domHandler.virtualize('p', {}, painting.makerLine),
        this.domHandler.virtualize('p', {}, painting.description),
        this.domHandler.virtualize('p', {}, painting.maker),
        this.domHandler.virtualize('div', {'class': 'color-blocks-holder'},
          ...painting.colors.map(color => this.domHandler.virtualize('div', {'class': 'color-block', 'style': `background-color: ${color}`}, color))
        )
      )
    )
  }
}

export default Detail
