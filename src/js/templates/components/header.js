import Component from '../component.js'
import LangSwitcher from './atoms/langswitcher.js'

class Header extends Component {
  constructor() {
    super()
  }
  build() {
    const v = this.domHandler.virtualize
    return v('header', {},
      v('h1', {}, 'Artpieces from the Rijksmuseum'),
      v('div', {}, v(LangSwitcher))
    )
  }
}

export default Header
