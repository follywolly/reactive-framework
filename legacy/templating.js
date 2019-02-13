function engine(string) {
  const elArray = []
  extract(string)
  elArray.forEach((el, i, all) => {
    if (i === 0){
      document.querySelector('#app').appendChild(el)
    } else {
      all[i - 1].appendChild(el)
    }
  })

  function extract(string, previous = false) {
    let elements = []
    let inner = ''
    console.log(string);

    const elStrings = string.match(/\<(.*?)\>+/g)
    if (elStrings) {
      elements = string.match(/\<(.*?)\>+/g)
        .map(string => string.replace(/[\<\>\/]+/g,''))
      inner = string.match(/<.*>(.*?)<\/.*>/g)
      inner = inner
        ? inner[0].substring(string.indexOf('>') + 1, string.lastIndexOf('<'))
        : ''
    } else {
      inner = string
    }

    let node;
    if (!previous || elements.length > 1) {
      const el = elements[0]
      node = document.createElement(el)
      elArray.push(node)
      if (inner) {
        extract(inner, node)
      }
    } else if (previous && elements.length <= 2) {
      const text = inner ? inner.replace(/<\/?.*?>/g,'') : false
      previous.innerText = text ? text : ''
    }
  }
}

const random = 'Hallo daar';
engine(`<div><p>${random}</p></div>`)
