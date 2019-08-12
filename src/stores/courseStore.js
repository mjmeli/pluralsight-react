import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = "change";

// Private data store for our store
let _courses = [];

// must extend EventEmitter to be able to send events
class CourseStore extends EventEmitter {
    // Allows React components to subscribe to our store
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    // Allows React components to remove their subscription
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    // Calls the change listeners that have been added
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    // Accessor to private data
    getCourses() {
        return _courses;
    }

    // Accessor to private data
    getCourseBySlug(slug) {
        return _courses.find(course => course.slug === slug);
    }
}

const store = new CourseStore();

// Register dispatcher
// Callback is called anytime an Action happens, any action
Dispatcher.register(action => {
    switch (action.actionType) {
        case actionTypes.CREATE_COURSE:
            // Update private storage
            _courses.push(action.course);

            // Emit a change to React components
            store.emitChange();

            break;
        case actionTypes.UPDATE_COURSE:
            _courses = _courses.map(course =>
                course.id === action.course.id ? action.course : course
            );
            store.emitChange();
            break;
        case actionTypes.DELETE_COURSE:
            _courses = _courses.filter(
                course => course.id !== parseInt(action.courseId, 10) // might come back as string
            );
            store.emitChange();
            break;
        case actionTypes.LOAD_COURSES:
            _courses = action.courses;
            store.emitChange();
            break;
        default:
            // We don't care about this action
            break;
    }
});

export default store;