import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Use default argument syntax on state to specify that state should be initialized to an empty array (we are storing an array)
export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.CREATE_COURSE:
            // Don't do the below, because this would mutate state
            //state.push(action.course);

            // Since state is immutable, return an updated copy of state
            // Here we are cloning the state array, and cloning the course on the action
            return [...state, { ...action.course }];

        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        default:
            // Default action type that this reducer doesn't care about should always return the current state
            return state;
    }
}