import Component from '../component.js'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('header', {},
      v('h1', {}, 'Kunststukken uit het rijksmuseum'),
    )
  }
}

export default Header
