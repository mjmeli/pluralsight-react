import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    // This below is all it takes to configure the state, but we will add some middleware.
    // Middleware is optional, but lets you enhance your store.
    ///return createStore(rootReducer, initialState);

    // We add redux-thunk which helps us handle async
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}