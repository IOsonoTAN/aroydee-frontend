const sortObject = object => {
  const ordered = {}
  Object.keys(object).sort().forEach(key => {
    ordered[key] = object[key]
  })

  return ordered
}

const reverseObject = object => {
  const ordered = {}
  Object.keys(object).reverse().forEach(key => {
    ordered[key] = object[key]
  })

  return ordered
}

export default {
  sortObject,
  reverseObject
}
