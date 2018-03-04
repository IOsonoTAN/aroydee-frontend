import { default as restaurant } from './defaults/restaurant'

const stateDefaults = {
  loading: true,
  canEdit: false,
  restaurant,
  businessHours: {},
  businessHoursOpen: [],
  businessHoursClose: []
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
    default:
      return state
  }
}
