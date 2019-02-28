import Component from '../component.js'
import request from '../../modules/data.js'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.loading = true
  }
  async mounted() {
    if (this.state.data.length > 0) {
      this.loading = false
    }

    if (this.loading) {
      const data = await request('Overview', {'adjacent': '&ps=100'})
      this.loading = false
      this.setState({data: data})
      this.store.setState({paintings: data})
    }
    
    this.store.watch('filtered', (data) => {
      this.setState({data})
    })

    if (!this.loading) {
      this.slider()
    }
  }
  build() {
    const v = this.domHandler.virtualize
    const slices = this.helper.chunk(this.state.data, 3)
    return v('div', {'id': 'slider-holder'},
      v('div', {'class': 'paintingsholder', 'id': 'paintingsholder'},
        ...slices.map((slice, i) => {
          return v('div', {'class': i == 0 ? 'painting-group active' : 'painting-group'},
          ...slice.map(painting =>
              v('div', {'class': 'painting'},
                v('a', {'href': `#/paintings/${painting.number}`},
                  v('figure', {},
                    v('img', {'src': painting.headerSrc}),
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
      ),
      v('button', {'id': 'slider-button'}, 'Volgende drie...')
    )
  }
  loader() {
    const v = this.domHandler.virtualize
    return v('div', {'id': 'slider-holder'},
      v('div', {'class': 'paintingsholder', 'id': 'paintingsholder'},
        v('div', {'class': 'painting-group active'},
          v('div', {'class': 'painting loader'},
            v('div', {'class': 'img'})
          ),
          v('div', {'class': 'painting loader'},
            v('div', {'class': 'img'})
          ),
          v('div', {'class': 'painting loader'},
            v('div', {'class': 'img'})
          )
        )
      )
    )
  }
  slider() {
    document.querySelector('#slider-button').addEventListener('click', () => {
      const all = document.querySelectorAll('.painting-group')
      const selected = document.querySelector('.painting-group.active')
      const elReset = e => {
        e.target.classList.remove('active-out')
        e.target.removeEventListener('transitionend', elReset)
      }
      all.forEach((element, index) => {
        if (element === selected) {
          selected.classList.remove('active')
          selected.addEventListener('transitionend', elReset)
          selected.classList.add('active-out')
          if (all[index + 1]) {
            all[index + 1].classList.add('active')
          } else {
            all[0].classList.add('active')
          }
        }
      })
    })
  }
}

export default Slider
