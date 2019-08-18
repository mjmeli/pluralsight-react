import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
    // This below is all it takes to configure the state, but we will add some middleware.
    // Middleware is optional, but lets you enhance your store.
    ///return createStore(rootReducer, initialState);

    // This below is optional, but will add support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // We would also like to add redux-immutable-state-invariant, which will warn us if we accidentally mutate Redux state.
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    );
}