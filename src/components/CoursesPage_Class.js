import React from 'react';
import { getCourses } from "../api/courseApi";

class CoursesPage extends React.Component {
    // Setup state
    state = {
        courses: []
    };

    // Lifecycle method. We can't set state until the component is mounted.
    componentDidMount() {
        getCourses().then(courses => {
            // Below will not work as we need to use setState instead.
            //this.state.courses = courses;

            // setState only updates properties you specify
            this.setState({ courses: courses });
        });
    }

    render() {
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
                    {this.state.courses.map(course => {
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
}

export default CoursesPage;