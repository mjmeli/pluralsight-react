import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses
    };
}

export function createCourseSuccess(course) {
    return {
        type: types.CREATE_COURSE_SUCCESS,
        course
    };
}

export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        course
    };
}

export function deleteCourseOptimistic(course) {
    return {
        type: types.DELETE_COURSE_OPTIMISTIC,
        course
    };
}

/* Thunks */

export function loadCourses() {
    // The function we return here is utilized by the redux-thunk middleware, and should match this signature
    return function (dispatch) {
        dispatch(beginApiCall());

        return courseApi
            .getCourses()
            .then(courses => dispatch(loadCoursesSuccess(courses)))
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());

        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse))
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        // We are doing an optimistic delete, so we don't dispatch begin/end API call actions,
        // or apiCallError action since we're not sh owing the loading status for this.
        // We are also dispatching immediately, and not in the .then of a promise.
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    }
}