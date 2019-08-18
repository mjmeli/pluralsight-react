import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
    return {
        type: types.CREATE_COURSE,
        course: course
    };
}

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses
    };
}

/* Thunks */

export function loadCourses() {
    // The function we return here is utilized by the redux-thunk middleware, and should match this signature
    return function (dispatch) {
        return courseApi
            .getCourses()
            .then(courses => dispatch(loadCoursesSuccess(courses)))
            .catch(error => {
                throw error;
            });
    }
}