import { combineReducers } from '@reduxjs/toolkit';
import auth from './reducers/auths.slice';
import common from './reducers/common.slice';
import booking from './reducers/Booking/booking.slice';
import about from './reducers/About/about.slice';
import venue from './reducers/Venue/venue.slice';
import enquires from './reducers/Enquires/enquires.slice';
import requestABrochure from './reducers/RequestABrochure/requestABrochure.slice';
// import user from './reducers/User/user.slice';
import guest from './reducers/Booking/guest.slice';
import googlePlace from './reducers/googlePlaceApi.slice';

export function createReducer(injectedReducers) {
  return combineReducers({
    ...injectedReducers,
    auth,
    googlePlace,
    common,
    booking,
    guest,
    about,
    venue,
    enquires,
    requestABrochure,
    // user,
  });
}
