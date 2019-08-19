import React from 'react';
import CourseForm from '../CourseForm';
import renderer from 'react-test-renderer';
import { courses, authors } from '../../../../tools/mockData'; // use the same mock data we use for mock API

// Snapshot tests tell you when the rendering of your component changes.
// They protect against accidental changes to component output.
// When you change the component rendering, you would hit 'u' in the console to update the snapshot.

it('sets submit button label to "Saving..." when saving is true', () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving
        />
    );
    
    expect(tree).toMatchSnapshot();
});

it('sets submit button label to "Save" when saving is false', () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            authors={authors}
            onSave={jest.fn()}
            onChange={jest.fn()}
            saving={false}
        />
    );
    
    expect(tree).toMatchSnapshot();
});