import Component from '../component.js'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props
    }
  }
  build() {
    const v = this.domHandler.virtualize
    const slices = this.helper.chunk(this.state.data, 3)
    return v('div', {'class': 'paintingsholder', 'id': 'paintingsholder'},
      ...slices.map((slice, i) => {
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
    )
  }
}

export default Slider
