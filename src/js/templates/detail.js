import Template from './template.js'

class Detail extends Template {
  constructor() {
    super()
  }
  build(painting) {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'holder'},
      v('h1', {}, 'Kunststukken uit het rijksmuseum'),
      v('div', {'class': 'painting detail'},
        v('a', {'href': '#/', 'class': 'btn'}, 'Return'),
        v('figure', {},
          v('img', {'src': painting.src, 'alt': `${painting.longTitle} - Rijksmuseum Collection`}),
          v('figcaption', {}, `${painting.longTitle} - Rijksmuseum Collection`)
        ),
        v('h3', {}, painting.title),
        v('p', {}, painting.makerLine),
        v('p', {}, painting.description),
        v('p', {}, painting.maker),
        v('div', {'class': 'color-blocks-holder'},
          ...painting.colors.map(color =>
            v('div', {'class': 'color-block', 'style': `background-color: ${color}`}, color)
          )
        )
      )
    )
  }
}

export default Detail
