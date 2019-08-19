import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

// Destructure props on the arguments here
// Also export the unconnected component so we can test this component directly
export function ManageCoursePage({
    courses,
    authors,
    loadCourses,
    loadAuthors,
    saveCourse,
    history,    // from react-router
    ...props
}) {
    // State to hold the local values in the form before they are submitted
    // `course` on props is the newCourse defined in the mockData
    const [ course, setCourse ] = useState({...props.course});
    const [ errors, setErrors ] = useState({});
    const [ saving, setSaving ] = useState(false);

    useEffect(() => {
        // When we first load this component, make sure we have loaded the courses into Redux from the API
        if (courses.length === 0) {
            loadCourses()
                .catch(error => {
                    alert('Loading courses failed ' + error);
                });
        } else {
            // Also want to update the course any time the course changes after we do the initial load
            setCourse({ ...props.course });
        }

        // When we first load this component, make sure we have loaded the authors into Redux from the API
        if (authors.length === 0) {
            loadAuthors()
                .catch(error => {
                    alert('Loading authors failed ' + error);
                });
        }
    }, [props.course]); // run anytime a new course is passed in on props

    // Centralized change handler
    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }));
    }

    // Client-side form validation
    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = 'Title is required.';
        if (!authorId) errors.author = 'Author is required.';
        if (!category) errors.category = 'Category is required.';

        setErrors(errors);

        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length == 0;
    }

    // Centralized save/create handler
    function handleSave(event) {
        // Keep page from posting back
        event.preventDefault();

        // Client-side validation
        if (!formIsValid())
            return;

        setSaving(true);
        saveCourse(course)
            .then(() => {
                toast.success('Course saved.');
                history.push('/courses') // don't need to setSaving = false as we redirect to another page
            })
            .catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message });
            });
    }

    return (
        authors.length === 0 || courses.length === 0
            ? (<Spinner />)
            : (
                <CourseForm
                    course={course}
                    errors={errors}
                    authors={authors}
                    onChange={handleChange}
                    onSave={handleSave}
                    saving={saving}
                />
            )
    );
}

// Prop types for this component, including the Redux props
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

// Determines what state is passed to our component via props.
// Be specific - we should only return what we need, as the component re-renders when state we pass changes
// NOTE: the names on state are the "keys" we give combineReducers in the root reducer
function mapStateToProps(state, ownProps) {
    // slug is accessible on props thanks to react-router
    const slug = ownProps.match.params.slug;

    // Set course to requested course if slug in URL (and courses have loaded), or empty course (defined in mockData.js)
    const course = slug && state.courses.length > 0
        ? getCourseBySlug(state.courses, slug)
        : newCourse;

    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

// We'll use #4 w/ object form of mapDispatchToProps where each property is automatically wrapped in a call to dispatch
const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse
};

// Decorate this component using Redux `connect` to connect the component to Redux
// Connect returns a function
//      const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
//      export default connectedStateAndProps(ManageCoursePage);
// If mapDispatchToProps is omitted, dispatch will be provided on props by default.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);