import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';

export function loadAuthorsSuccess(authors) {
    return {
        type: types.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

/* Thunks */

export function loadAuthors() {
    // The function we return here is utilized by the redux-thunk middleware, and should match this signature
    return function (dispatch) {
        return authorApi
            .getAuthors()
            .then(authors => dispatch(loadAuthorsSuccess(authors)))
            .catch(error => {
                throw error;
            });
    }
}