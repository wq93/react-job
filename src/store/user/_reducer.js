import * as constants from './constants'
// import {fromJS} from 'immutable';

const defaultState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.AUTH_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload}
    case constants.LOAD_DATA:
      return {...state, ...action.payload}
    case constants.ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case constants.LOGIN_OUT:
      return {...defaultState, redirectTo: '/login'}
    default:
      return state
  }
}