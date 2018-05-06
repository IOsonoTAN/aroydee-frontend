import { default as restaurant } from './defaults/restaurant'

const stateDefaults = {
  isNewObject: false,
  loading: true,
  canEdit: false,
  restaurant,
  businessHoursOpen: [],
  businessHoursClose: [],
  openCloseDay: {
    open: 'monday',
    openTime: '09:00',
    close: 'friday',
    closeTime: '09:00'
  }
}

export default (state = stateDefaults, { type, payload }) => {
  switch (type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: payload
      }
    }
    case "SET_CAN_EDIT": {
      return {
        ...state,
        canEdit: payload
      }
    }
    case "IS_NEW_OBJECT": {
      return {
        ...state,
        isNewObject: payload
      }
    }
    case "SET_INIT_STATE": {
      return {
        ...state,
        restaurant: payload
      }
    }
    case "CHANGE_PROVINCE" : {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          province: payload
        }
      }
    }
    case "CHANGE_TITLE": {
      const { lang, value } = payload
      const title = state.restaurant.title
      title[lang] = value

      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          title
        }
      }
    }
    case "CHANGE_DESCRIPTION": {
      const { lang, value } = payload
      let description = state.restaurant.description
      if (!description) {
        description = {
          th: '',
          en: ''
        }
      }
      description[lang] = value

      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          description
        }
      }
    }
    case "CHANGE_OPEN_CLOSE_DAY": {
      return {
        ...state
      }
    }
    case "CHANGE_KIND": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          kind: payload
        }
      }
    }
    case "CHANGE_TYPE": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          type: payload
        }
      }
    }
    case "CHANGE_CATEGORY": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          category: payload
        }
      }
    }
    case "CHANGE_RATING": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          rating: payload
        }
      }
    }
    case "CHANGE_LOCATION_LATLNG": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          locationInfo: {
            ...state.restaurant.locationInfo,
            latitude: (payload.name === 'latitude' ? parseFloat(payload.latLng) : state.restaurant.locationInfo.latitude),
            longtitude: (payload.name === 'longitude' ? parseFloat(payload.latLng) : state.restaurant.locationInfo.longtitude),
          }
        }
      }
    }
    case "CHANGE_LOCATION_TITLE": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          locationInfo: {
            ...state.restaurant.locationInfo,
            title: payload
          }
        }
      }
    }
    case "CHANGE_TELEPHONE_NUMBER": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          telephone: payload
        }
      }
    }
    case "CHANGE_PICTURES": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          pictures: payload
        }
      }
    }
    case "CHANGE_GALLERY": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          gallery: payload
        }
      }
    }
    case "CHANGE_BUSINESS_HOURS": {
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          businessHours: payload
        }
      }
    }
    default:
      return state
  }
}
