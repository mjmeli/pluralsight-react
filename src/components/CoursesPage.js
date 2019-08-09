import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import CourseList from './CourseList';
import { Link } from 'react-router-dom';

function CoursesPage() {
    // Setup state
    const [courses, setCourses] = useState([]);

    // Hook version of lifecycle method. This is called when rendered.
    useEffect(() => {
        getCourses().then(_courses => {
            // This is how you set state with hooks, not using setState
            setCourses(_courses);
        });
    }, []); // Use an empty array so this is only called once

    return (<>
        <h2>Courses</h2>
        <Link className="btn btn-primary" to="/course">
            Add Course
        </Link>
        <CourseList courses={courses} />
    </>);
}

export default CoursesPage;