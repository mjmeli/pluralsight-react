import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action
) {
    if (action.type === types.BEGIN_API_CALL) {
        return state + 1;
    }
    // If the API call errored or ended in success, decrement count by 1.
    // We use a trick here using our convention that all async action types end in success.
    // This allows us to avoid having to dispatch an action every time an API call finishes.
    else if (action.type == types.API_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}