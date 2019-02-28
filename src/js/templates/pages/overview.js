import Component from '../component.js'
import Search from '../components/search.js'
import Slider from '../components/slider.js'

class Overview extends Component {
  constructor() {
    super()
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'holder'},
      v(Search),
      v('div', {},
        v(Slider)
      )
    )
  }
}

export default Overview
