class Helper {
  constructor() {}
  chunk(array, size = 3) {
      let length = array == null ? 0 : array.length;
      if (!length) {
        return []
      }
      let index = 0,
          result = []

      while (index < length) {
        let ch = array.slice(index, index + size) // zolang er nog overige items in de array zitten, maak nieuwe chunk zo lang als size. Als er minder items in zitten dan de size grootte wordt de laatste chunk automatisch gevuld met overige items.
        result.push(ch)
        index += size // reset index naar het eind van de vorige gemaakte chunk
      }
      return result
    }
}
export default Helper
