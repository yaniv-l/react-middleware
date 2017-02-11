import { FETCH_USERS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      //debugger; // Pause in debug here to see action.payload
      //console.log(action.payload);  // For Debug
      return [...state, ...action.payload.data];
    default:
      return state;
  }
}
