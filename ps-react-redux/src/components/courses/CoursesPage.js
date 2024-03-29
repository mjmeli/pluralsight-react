import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    };

    componentDidMount() {
        const { courses, authors, actions } = this.props;

        // When we first load this component, make sure we have loaded the courses into Redux from the API
        if (courses.length === 0) {
            actions.loadCourses()
                .catch(error => {
                    alert('Loading courses failed ' + error);
                });
        }

        // When we first load this component, make sure we have loaded the authors into Redux from the API
        if (authors.length === 0) {
            actions.loadAuthors()
                .catch(error => {
                    alert('Loading authors failed ' + error);
                });
        }
    }

    handleDeleteCourse = async course => {
        toast.success('Course deleted');

        try {
            await this.props.actions.deleteCourse(course);
        } catch (error) {
            toast.error('Delete failed. ' + error.message, { autoClose: false })
        }
    }

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to='/course' />}

                <h2>Courses</h2>
                
                {this.props.loading
                    ? <Spinner />
                    : (
                        <>
                            <button
                                style={{ marginBottom: 20 }}
                                className='btn btn-primary add-course'
                                onClick={() => this.setState({ redirectToAddCoursePage: true })}
                            >
                                Add Course
                            </button>
                            <CourseList
                                courses={this.props.courses}
                                onDeleteClick={this.handleDeleteCourse}
                            />
                        </>
                    )}
            </>
        );
    }
}

// Prop types for this component, including the Redux props
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
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
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
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
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    };
}


// Decorate this component using Redux `connect` to connect the component to Redux
// Connect returns a function
//      const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
//      export default connectedStateAndProps(CoursesPage);
// If mapDispatchToProps is omitted, dispatch will be provided on props by default.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);