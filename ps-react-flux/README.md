# [Building Applications in React and Flux](https://app.pluralsight.com/library/courses/react-flux-building-applications)

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
* Forms
    * ManageCoursePage - example of using URL parameters, form compoment with form handling and validation logic
    * CourseForm - form compoment with form markup
    * TextInput - custom form input component with form validation markup
* Flux
    * appDispatcher - very simple dispatcher
    * actions/*Actions - actions
    * actions/actionTypes - constants defining action types
    * stores/* - stores
    * ManageCoursePage -> wiring up flux instead of API
    * CoursesPage -> wiring up flux instead of API, with initialization by subscribing to Flux Actions, and cleanup on unmount