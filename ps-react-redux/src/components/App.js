import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';

function App() {
    return (
        <div className="container-fluid">
            {/* Include header above Route components so it always renders */}
            <Header />

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/courses" component={CoursesPage} />

                {/* 404 Page */}
                <Route component={PageNotFound} />
            </Switch>

        </div>
    )
}

export default App;