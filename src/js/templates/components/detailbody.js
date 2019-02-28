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
  mounted() {
    if (this.loading && !this.langChange) {
      this.getData(true)
    }

    this.store.watch('lang', () => {
      this.langChange = true
      this.loading = true
      this.setState({data: null})
      this.getData(false)
    })
  }
  async getData(local){
    const lang = this.store.getState('lang')
    try {
      const data = await request(this.state.id, {'insert': `/${this.state.id}`, lang}, local)
      this.loading = false
      this.setState({data})
      this.langChange = false
    } catch (e) {
      console.error(e)
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
