# [Building Applications in React and Redux](https://app.pluralsight.com/library/courses/react-redux-react-router-es6/)

## Summary
* Environment
    * `webpack.config.(dev|prod).js` - Webpack configuration files
    * `package.json` - includes Babel and ESLint configurations, and custom npm scripts
        * scripts to start up mock API and the dev server
        * scripts to run tests
        * scripts to run production build, with testing and linting, and start up a web server with production bundle
* Mock API
    * `tools/apiServer.js` - Express.js server
    * `tools/mockData.js` - seed data for API DB
    * `tools/createMockDb.js` - script that regenerates our DB from the seed data
    * `src/api/*` - API wrapper library
    * `webpack.config.dev.js` - Configure environment variable to point to mock API
    * `package.json` - scripts to start running the server
* Entry Points
    * `src/index.css/html` - root HTML and CSS template
    * `src/index.js` - entry point, with `react-router`
    * `src/components/App.js` - main app component, with routing
* Redux
    * `src/redux/configureStore.js` + `src/redux/configureStore.(dev|prod).js` - creates the single global store with `createStore` with middleware depending on environment
    * `src/redux/actions/courseActions.js` - course related action creators
    * `src/redux/reducers/index.js` - root reducer using `combineReducer`
    * `src/redux/reducers/courseReducer.js` - reducer for course actions
    * `src/redux/reducers/initialState.js` - optional file that helps set default state values, and which improves clarity by showing the shape of the store
    * `src/index.js` - entry point configured to instantiate the Redux store
    * `src/components/courses/CoursesPage.js` - container component connected to Redux store using `connect` that dispatches actions, with PropTypes for state and dispatcher
* Redux Thunks
    * `src/redux/configureStore.js` + `src/redux/configureStore.(dev|prod).js` - setup the store to use `redux-thunk` for async handling
    * `src/components/courses/ManageCoursePage.js` - component using async calls
    * `src/redux/reducers/apiStatusActions.js` and `src/redux/reducers/apiStatusReducer.js` - setup async progress status with spinner
* Testing General
    * `package.json` - setup to run tests with `jest` and `enzyme`
    * `tools/fileMock.js`, `tools/styleMock.js` - mocks file and CSS imports for `jest`
    * `tools/testSetup.js` - configuration of `enzyme` adapter
* React Testing
    * `src/components/courses/tests/CourseForm.Snapshots.test.js` - example snapshot tests
    * `src/components/courses/tests/CourseForm.Enzyme.test.js` - example tests with `enzyme` shallow rendering
    * `src/components/common/tests/Header.Enzyme.test.js` - example tests with `enzyme` mount rendering compared to shallow rendering
    * `src/components/common/tests/CourseForm.ReactTestingLibrary.test.js` - example tests with React Testing Library
* Redux Testing
    * `src/components/courses/tests/ManageCoursePage.test.js` - testing connect React component
    * `src/redux/actions/tests/courseActions.test.js` - unit testing action creators and thunks with mocking
    * `src/redux/reducers/tests/courseReducer.test.js` - unit testing reducers
    * `src/redux/tests/store.test.js` - integration testing the Redux store
* Misc. Examples
    * `src/components/courses/CoursesPage.js` - class component; async/await instead of promises
    * `src/components/courses/ManageCoursePage.js` - function component/hook
    * `src/redux/reducers/courseReducer.js` - default parameter value syntax

## Original README
The original README that came with the starting files is below.
### Get Started

1. **Install [Node 8](https://nodejs.org)** or newer. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)(https://github.com/coryhouse/pluralsight-redux-starter/archive/master.zip)
2. **Navigate to this project's root directory on the command line.**
3. **Install Node Packages.** - `npm install`
4. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome.
5. Having issues? See below.

### Having Issues? Try these things first:

1. Run `npm install` - If you forget to do this, you'll get an error when you try to start the app later.
2. Don't run the project from a symbolic link. It will cause issues with file watches.
3. Delete any .eslintrc in your user directory and disable any ESLint plugin / custom rules within your editor since these will conflict with the ESLint rules defined in the course.
4. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
5. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
6. Nothing above work? Delete your node_modules folder and re-run npm install.

#### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

#### Development Dependencies

| **Dependency**                  | **Use**                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| @babel/core                     | Transpiles modern JavaScript so it runs cross-browser            |
| babel-eslint                    | Lint modern JavaScript via ESLint                                |
| babel-loader                    | Add Babel support to Webpack                                     |
| babel-preset-react-app          | Babel preset for working in React. Used by create-react-app too. |
| css-loader                      | Read CSS files via Webpack                                       |
| cssnano                         | Minify CSS                                                       |
| enzyme                          | Simplified JavaScript Testing utilities for React                |
| enzyme-adapter-react-16         | Configure Enzyme to work with React 16                           |
| eslint                          | Lints JavaScript                                                 |
| eslint-loader                   | Run ESLint via Webpack                                           |
| eslint-plugin-import            | Advanced linting of ES6 imports                                  |
| eslint-plugin-react             | Adds additional React-related rules to ESLint                    |
| fetch-mock                      | Mock fetch calls                                                 |
| html-webpack-plugin             | Generate HTML file via webpack                                   |
| http-server                     | Lightweight HTTP server to serve the production build locally    |
| jest                            | Automated testing framework                                      |
| json-server                     | Quickly create mock API that simulates create, update, delete    |
| mini-css-extract-plugin         | Extract imported CSS to a separate file via Webpack              |
| node-fetch                      | Make HTTP calls via fetch using Node - Used by fetch-mock        |
| npm-run-all                     | Display results of multiple commands on single command line      |
| postcss-loader                  | Post-process CSS via Webpack                                     |
| react-test-renderer             | Render React components for testing                              |
| react-testing-library           | Test React components                                            |
| redux-immutable-state-invariant | Warn when Redux state is mutated                                 |
| redux-mock-store                | Mock Redux store for testing                                     |
| rimraf                          | Delete files and folders                                         |
| style-loader                    | Insert imported CSS into app via Webpack                         |
| webpack                         | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer         | Generate report of what's in the app's production bundle         |
| webpack-cli                     | Run Webpack via the command line                                 |
| webpack-dev-server              | Serve app via Webpack                                            |
