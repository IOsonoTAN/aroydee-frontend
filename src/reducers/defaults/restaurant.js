import { defaultValues } from '../../config'

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const businessHours = {}

for (const day of days) {
  if (!businessHours[day]) {
    businessHours[day] = {
      enabled: false,
      open: defaultValues.businessHours.open,
      close: defaultValues.businessHours.close
    }
  }
}

export default {
  title: {
    th: '',
    en: ''
  },
  description: {
    th: '',
    en: ''
  },
  pictures: {
    logo: {
      alt: null,
      url: null,
      publicId: null
    },
    feature: {
      alt: null,
      url: null,
      publicId: null
    }
  },
  locationInfo: {
    title: '',
    latitude: 0,
    longtitude: 0
  },
  telephone: [],
  businessHours,
  type: 'normal',
  province: null,
  category: null
}
