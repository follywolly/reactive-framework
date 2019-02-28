import Component from './templates/component.js'
import Header from './templates/components/header.js'
import Footer from './templates/components/footer.js'

class App extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'app'},
      v(Header),
      v('div', {'id': 'router-view'}), // every route renders in router-view element
      v(Footer)
    )
  }
}

export default App
