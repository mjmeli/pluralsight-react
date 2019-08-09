import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi';
import { toast } from 'react-toastify';

const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    useEffect(() => {
        const slug = props.match.params.slug;   // pull slug from the route /course/:slug
        if (slug) {
            courseApi.getCourseBySlug(slug)
                .then(_course => setCourse(_course));
        }
    }, [props.match.params.slug])  // Can't use an empty array because we are monitoring the slug value

    function handleChange(event) {  // could also destructure event by replacing event with { target }
        const updatedCourse = {
            ...course,  // use spread operator to create a copy of the course object
            [event.target.name]: event.target.value // use computed property syntax to set the property we want
        };
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const _errors = {};

        if (!course.title) {
            _errors.title = "Title is required";
        }
        if (!course.authorId) {
            _errors.authorId = "Author ID is required";
        }
        if (!course.category) {
            _errors.category = "category is required";
        }

        setErrors(_errors);
        
        // Form is valid if the errors object has no properties
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault(); // prevent postback to server
        
        // Form validation
        if (!formIsValid()) {
            return;
        }

        courseApi.saveCourse(course)
            .then(() => {
                props.history.push("/courses");
                toast.success("Course saved!");
            });
    }

    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm 
                course={course}
                onChange={handleChange}
                onSubmit={handleSubmit}
                errors={errors}
            />
        </>
    );
}

export default ManageCoursePage;