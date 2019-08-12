import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';

// This function is called the action creater
export function saveCourse(course) {
    // Return promise so that the consumer can use it
    return courseApi.saveCourse(course)
        .then(savedCourse => {
            // "Hey dispatcher, go tell all the stores that a course was just saved."
            dispatcher.dispatch({
                // This is the action payload
                actionType: course.id ? actionTypes.UPDATE_COURSE : actionTypes.CREATE_COURSE,
                course: savedCourse
            });
        });
}

export function deleteCourse(courseId) {
    return courseApi.deleteCourse(courseId)
        .then(() => {
            dispatcher.dispatch({
                actionType: actionTypes.DELETE_COURSE,
                courseId: courseId
            });
        });
}

export function loadCourses() {
    return courseApi.getCourses()
        .then(courses => {
            dispatcher.dispatch({
                actionType: actionTypes.LOAD_COURSES,
                courses: courses
            });
        });
}