import Component from '../component.js'
import Slider from '../../templates/components/slider.js'

class Search extends Component {
  constructor(props) {
    super(props)
    this.slider = new Slider()
  }
  build() {
    const v = this.domHandler.virtualize
    return v('form', {'class': 'search-holder'},
      v('label', {'for': 'search-input'}, 'Search painting'),
      v('input', {'type': 'text', 'id': 'search-input'}, ''),
      v('input', {'type': 'submit', 'class': 'search-submit'}, 'Search')
    )
  }
  mounted() {
    this.search()
  }
  search(){
    const input = document.querySelector('#search-input')
    const parent = document.querySelector('#test')

    // let previous = data
    input.addEventListener('input', () => {
      const data = this.store.getState('paintings')
      if (!data) return
      const filtered = data.filter(painting =>
        painting.title.toLowerCase().indexOf(input.value.toLowerCase()) > -1 ||
        painting.maker.toLowerCase().indexOf(input.value.toLowerCase()) > -1
      )
      this.slider.setState({data: filtered})
    })
  }
}

export default Search
