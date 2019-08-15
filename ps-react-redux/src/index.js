import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Since we setup Webpack to injest CSS, CSS will pull this into the bundled JS
import App from './components/App';
import './index.css';

render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app"));