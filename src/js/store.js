'use strict'

import Store from './modules/store.js'

const store = new Store()

store.setState({
  lang: 'en',
  query: '',
  filtered: []
})

store.filter = () => {
  const paintings = store.state.paintings
  const query = store.state.query
  if (!paintings) return
  if (!query) return store.setState({filtered: paintings})
  const filtered = paintings.filter(painting =>
    painting.title.toLowerCase().indexOf(query) > -1 ||
    painting.maker.toLowerCase().indexOf(query) > -1
  )
  store.setState({filtered})
}
store.watch('query', () => {
  store.commit('filter')
})

export default store
