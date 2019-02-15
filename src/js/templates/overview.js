import Template from './template.js'

class Overview extends Template {
  constructor(data) {
    super()
  }
  build(data) {
    const v = this.domHandler.virtualize

    this.slices = this.helper.chunk(data, 3)
    return v('div', {'class': 'holder'},
      v('h1', {}, 'Kunststukken uit het rijksmuseum'),
      v('div', {'class': 'paintingsholder'},
        ...this.slices.map((slice, i) => {
          return v('div', {'class': i == 0 ? 'painting-group active' : 'painting-group'},
          ...slice.map(painting =>
              v('div', {'class': 'painting'},
                v('a', {'href': `#/paintings/${painting.number}`},
                  v('figure', {},
                    v('img', {'src': painting.headerSrc}, ''),
                    v('figcaption', {},
                      v('h3', {}, painting.title),
                      v('p', {}, painting.maker)
                    )
                  )
                )
              )
            )
          )
        })
      ),
      v('button', {'id': 'slider-button'}, 'Volgende drie...')
    )
  }
}

export default Overview
