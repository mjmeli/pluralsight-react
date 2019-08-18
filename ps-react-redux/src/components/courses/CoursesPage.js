import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
    state = {
        course: {
            title: ''
        }
    };

    // Use arrow function with a class field to avoid problems of the this keyword
    handleChange = event => {
        const course = { ...this.state.course, title: event.target.value };
        this.setState({ course: course });
    };

    handleSubmit = event => {
        event.preventDefault();

        // Dispatch a course creation action. createCourse is mapped via mapDispatchToProps.
        this.props.actions.createCourse(this.state.course);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.course.title}
                />
                <input type="submit" value="Save" />

                { this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </form>
        );
    }
}

// Prop types for this component, including the Redux props
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Determines what state is passed to our component via props.
// Be specific - we should only return what we need, as the component re-renders when state we pass changes
// NOTE: we are omitting ownProps as we don't need it, but I have left for visibility
function mapStateToProps(state/*, ownProps*/) {
    return {
        courses: state.courses
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
        actions: bindActionCreators(courseActions, dispatch)
    };
}


// Decorate this component using Redux `connect` to connect the component to Redux
// Connect returns a function
//      const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
//      export default connectedStateAndProps(CoursesPage);
// If mapDispatchToProps is omitted, dispatch will be provided on props by default.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);