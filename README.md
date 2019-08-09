# Building Applications with React and Flux

## How to use
`npm start`

## Summary
* index.js - the app entry point with router wrapper
* App.js - the main app, with routing
* HomePage - basic functional component
* AboutPage - basic class component, with JSX fragment
* CoursesPage_Class - class version of CoursesPage with lifecycle methods and state
* CoursesPage_Hook - hook version of CoursesPage with useState, useEffect
* CoursesPage - controller view version of CoursesPage, with useState, useEffect, and props, no markup
    * This simplifies the component. The CoursesPage component is focused solely on state concerns. The markup is in the CourseList component, which doesn't have to worry about state.
* CourseList - markup for CoursesPage, uses props and PropTypes
* ManageCoursePage - example of using URL parameters