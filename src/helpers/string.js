const zeroFill = string => {
  if (string < 10) {
    return '0' + string
  }

  return string
}

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default {
  zeroFill,
  numberWithCommas
}
