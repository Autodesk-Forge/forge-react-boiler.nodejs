import ServiceManager from 'SvcManager'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_NAVBAR_STATE = 'SET_NAVBAR_STATE'
export const SAVE_APP_STATE = 'SAVE_APP_STATE'
export const SET_VIEWER_ENV = 'SET_VIEWER_ENV'
export const SET_USER = 'SET_USER'

// ------------------------------------
// Actions
// ------------------------------------
export function saveAppState () {
  return {
    type    : SAVE_APP_STATE
  }
}

export function setNavbarState (state) {
  return {
    type    : SET_NAVBAR_STATE,
    payload : state
  }
}

export function setViewerEnv (env) {
  return {
    type    : SET_VIEWER_ENV,
    payload : env
  }
}

export function setUser (user) {
  return {
    type    : SET_USER,
    payload : user
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [SAVE_APP_STATE] : (state, action) => {

    const storageSvc = ServiceManager.getService(
      'StorageSvc')

    storageSvc.save('AppState', state)

    return state
  },

  [SET_NAVBAR_STATE] : (state, action) => {

    const navbar = Object.assign({},
      state.navbar, action.payload)

    return Object.assign({}, state, {
      navbar
    })
  },

  [SET_VIEWER_ENV] : (state, action) => {

    return Object.assign({}, state, {
      viewerEnv: action.payload
    })
  },

  [SET_USER] : (state, action) => {

    return Object.assign({}, state, {
      user: action.payload
    })
  }
}

// ------------------------------------
// Initial App State
// ------------------------------------

const createInitialState = () => {

  const defaultState = {
    navbar: {
      links:{
        about: true,
        login: true,
        home: true
      }
    },
    viewerEnv: null,
    user: null
  }

  const storageSvc = ServiceManager.getService(
    'StorageSvc')

  const storageState = storageSvc.load(
    'AppState')

  const initialState = Object.assign({},
    defaultState,
    storageState)

  return initialState
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer (
  state = createInitialState(), action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
