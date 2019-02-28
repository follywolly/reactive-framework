import Component from '../../component.js'

class LangSwitcher extends Component {
  constructor() {
    super()
    this.state = {
      nextLang: 'nl'
    }
  }
  mounted() {
    this.switchLang()
  }
  build() {
    const v = this.domHandler.virtualize
    return v('button', {'id': 'lang-switcher'}, `Switch to: ${this.state.nextLang}`)
  }
  switchLang() {
    const button = document.querySelector('#lang-switcher')
    button.addEventListener('click', () => {
      const cur = this.store.getState('lang')
      this.store.setState({lang: this.state.nextLang})
      this.setState({nextLang: cur})
    })
  }
}

export default LangSwitcher
