import Component from '../component.js'
import request from '../../modules/data.js'

class DetailBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      data: {}
    }
    this.loading = true
  }
  async mounted() {
    if (!this.loading) return
    try {
      const data = await request(this.state.id, {'insert': `/${this.state.id}`})
      this.loading = false
      this.setState({data})
    } catch (e) {
      // render error page
    }
  }
  build() {
    const v = this.domHandler.virtualize
    const painting = this.state.data

    return v('div', {'class': 'painting-body'},
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
  }
  loader() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'painting detail loader', 'data-id': this.id},
      v('div', {'class': 'img'}),
      v('div', {'class': 'text'})
    )
  }
}

export default DetailBody
