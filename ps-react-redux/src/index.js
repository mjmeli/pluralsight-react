import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Since we setup Webpack to injest CSS, CSS will pull this into the bundled JS
import App from './components/App';
import './index.css';
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux';

// Instantiate the store. We aren't going to create any initial state.
// Our reducers have a default state configured with default parameters, so doing so here would override those defaults.
const store = configureStore();

render(
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>,
    document.getElementById('app')
);