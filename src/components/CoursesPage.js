import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";
import CourseList from './CourseList';

function CoursesPage() {
    // Setup state
    const [courses, setCourses] = useState([]);

    // Hook version of lifecycle method. This is called when rendered.
    useEffect(() => {
        getCourses().then(_courses => {
            // This is how you set state with hooks, not using setState
            setCourses(_courses);
        });
    }, []);

    return (<>
        <h2>Courses</h2>
        <CourseList courses={courses} />
    </>);
}

export default CoursesPage;