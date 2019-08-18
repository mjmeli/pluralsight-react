import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Use default argument syntax on state to specify that state should be initialized to an empty array (we are storing an array)
export default function authorReducer(state = initialState.authors, action) {
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;

        default:
            // Default action type that this reducer doesn't care about should always return the current state
            return state;
    }
}