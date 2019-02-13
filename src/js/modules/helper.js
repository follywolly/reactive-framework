class Helper {
  constructor() {}
  chunk(array, size) {

      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = []

      while (index < length) {
        let newArr = array.slice(index, index + size)
        result.push(newArr)
        index += size
      }
      return result;
    }
}
export default Helper
