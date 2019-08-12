import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import courseStore from '../stores/courseStore';
import { loadCourses, deleteCourse } from '../actions/courseActions';

function CoursesPage() {
    // Setup state
    const [courses, setCourses] = useState(courseStore.getCourses());   // need this to set initial values

    // Hook version of lifecycle method. This is called when rendered.
    useEffect(() => {
        // Subscribe to store, so that when the course store changes, we re-render (via the onChange callback below)
        courseStore.addChangeListener(onChange);

        // Check if course store has any courses, and if not, load the initial ones
        // When the courses are added, the onChange function below will be added due to the change listener setup above
        if (courseStore.getCourses().length === 0) {
            loadCourses();
        }

        // We want to cleanup the subscription on unmount, which we do by returning a callback function from useEffect
        return () => courseStore.removeChangeListener(onChange);
    }, []); // Use an empty array so this is only called once

    function onChange() {
        // This is how you set state with hooks, not using setState
        setCourses(courseStore.getCourses());
    }
    
    return (<>
        <h2>Courses</h2>
        <Link className="btn btn-primary" to="/course">
            Add Course
        </Link>
        <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>);
}

export default CoursesPage;