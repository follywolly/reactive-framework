import Component from '../component.js'

class Footer extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('footer', {},
      v('p', {},
        v('Made with '),
        v('a', {'href': 'https://www.rijksmuseum.nl/nl/api'}, 'the Rijksmuseum Api')
      )
    )
  }
}

export default Footer
