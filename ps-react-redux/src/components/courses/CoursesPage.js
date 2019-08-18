import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    componentDidMount() {
        const { courses, authors, actions } = this.props;

        // When we first load this component, make sure we have loaded the courses from the API
        if (courses.length === 0) {
            actions.loadCourses()
                .catch(error => {
                    alert('Loading courses failed ' + error);
                });
        }

        // When we first load this component, make sure we have loaded the authors from the API
        if (authors.length === 0) {
            actions.loadAuthors()
                .catch(error => {
                    alert('Loading authors failed ' + error);
                });
        }
    }

    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </>
        );
    }
}

// Prop types for this component, including the Redux props
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Determines what state is passed to our component via props.
// Be specific - we should only return what we need, as the component re-renders when state we pass changes
// NOTE: the names on state are the "keys" we give combineReducers in the root reducer
// NOTE: we are omitting ownProps as we don't need it, but I have left for visibility
function mapStateToProps(state/*, ownProps*/) {
    return {
        // Join author names into the list of courses
        // Note we must check the authors have been loaded first
        courses:
            state.authors.length === 0
                ? []
                : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(author => author.id === course.authorId).name
                };
            }),
        authors: state.authors
    };
}

/* 
    mapDispatchToProps examples
        Determines what actions are available to our component via props.

(1) Example of this function was omitted
      Usage: this.props.dispatch(courseActions.createCourse(course))

(2, 3) Examples with mapDispatchToProps defined as a function
function mapDispatchToProps(dispatch) {
    return {
        (2) Example using manual mapping
                NOTE: must wrap call in dispatch and not call the action creator directly
                Usage: this.props.createCourse(course)
        createCourse: course => dispatch(courseActions.createCourse(course))

        (3) Example using bindActionCreators
                Returns an object mimicking the original object, but with each function wrapped in a call to dispatch
                Usage: this.props.actions.createCourse()
        actions: bindActionCreators(courseActions, dispatch)
    };
}

4) Example with mapDispatchToProps defined as an object
    Each action creator action we want to expose is listed as a property.
    Each property is automatically bound to dispatch.
const mapDispatchToProps = {
    createCourse: courseActions.createCourse 
}
*/

// We'll use #3 w/ bindActionCreators above so we don't have to update this function when we add more functions
function mapDispatchToProps(dispatch) {
    return {
        actions: { 
            // Can pass single functions to bindActionCreators
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}


// Decorate this component using Redux `connect` to connect the component to Redux
// Connect returns a function
//      const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
//      export default connectedStateAndProps(CoursesPage);
// If mapDispatchToProps is omitted, dispatch will be provided on props by default.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);