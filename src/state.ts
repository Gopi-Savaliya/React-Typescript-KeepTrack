import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import { initialProjectState, projectReducer } from "./projects/state/projectReducer";
import { ProjectState } from "./projects/state/projectTypes";

const reducer = combineReducers({
    projectState: projectReducer
});

export const configureStore = (preloadedState: any) => {
    const middlewares = [ReduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancer = composeWithDevTools(middlewareEnhancer);
    const store = createStore(reducer, preloadedState, enhancer);
    return store;
}

export interface AppState{
    projectState: ProjectState;
}

export const initialAppState: AppState = {
    projectState: initialProjectState
}

export const store = configureStore(initialAppState);
