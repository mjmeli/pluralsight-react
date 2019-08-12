import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import { toast } from 'react-toastify';
import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';

const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    useEffect(() => {
        // Subscribe to store, so that when the course store changes, we re-render (via the onChange callback below)
        courseStore.addChangeListener(onChange);
        
        const slug = props.match.params.slug;   // pull slug from the route /course/:slug
        
        // If courses are not yet loaded, we must request them first. Otherwise, we can just load from store.
        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            setCourse(courseStore.getCourseBySlug(slug));
        }

        // We want to cleanup the subscription on unmount, which we do by returning a callback function from useEffect
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug])  // Can't use an empty array because we are monitoring the slug value

    function onChange() {
        setCourses(courseStore.getCourses());
    }

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

        courseActions.saveCourse(course)
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