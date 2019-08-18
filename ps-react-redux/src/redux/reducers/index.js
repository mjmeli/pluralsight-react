import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    // The names we define in this list are the names that will be used in mapStateToProps, as the state are stored in memory by these names as keys
    courses,
    authors,
    apiCallsInProgress
});

export default rootReducer;