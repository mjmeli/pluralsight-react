import React from 'react';
import { cleanup, render } from 'react-testing-library';
import CourseForm from '../CourseForm';

// cleanup must be run after each test
afterEach(cleanup);

// Factory function to call react component with default values to make life easier
// (not specific to React Testing Library)
function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    const props = { ...defaultProps, ...args };
    return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
    const { getByText } = renderCourseForm();   // render returns various functions we can use to query the component's DOM
    getByText('Add Course');    // this has an assertion built in. If the text is not found, it will fail.
});

it('should label save button as "Save" when not saving', () => {
    const { getByText } = renderCourseForm();
    getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
    const { getByText } = renderCourseForm({ saving: true });
    getByText('Saving...');
});