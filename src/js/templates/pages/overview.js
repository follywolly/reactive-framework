import Template from '../template.js'
import Search from '../components/search.js'
import Slider from '../components/slider.js'

class Overview extends Template {
  constructor() {
    super()
  }
  build(data) {
    const v = this.domHandler.virtualize
    // const c = this.domHandler.component
    return v('div', {'class': 'holder'},
      v('h1', {}, 'Kunststukken uit het rijksmuseum'),
      v(Search),
      v('div', {'id': 'slider-holder'},
        v(Slider, data),
      ),
      v('button', {'id': 'slider-button'}, 'Volgende drie...')
    )
  }
}

export default Overview
