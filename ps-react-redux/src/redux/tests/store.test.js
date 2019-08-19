import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

it('Should handle creating courses', () => {
    // arrange
    // Create the store and pass it our root reducer and initial state
    const store = createStore(rootReducer, initialState);
    const course = {
        title: 'Clean Code'
    };

    // act
    // Get createCourseSuccess action and dispatch it
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    // Get the state from the store and make it its as we expected
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);
});