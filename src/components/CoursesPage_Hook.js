import React, { useState, useEffect } from 'react';
import { getCourses } from "../api/courseApi";

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
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author ID</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => {
                    return (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.authorId}</td>
                            <td>{course.category}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>);
}

export default CoursesPage;