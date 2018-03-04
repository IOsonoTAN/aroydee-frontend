const zeroFill = string => {
  if (string < 10) {
    return '0' + string
  }

  return string
}

export default {
  zeroFill
}
