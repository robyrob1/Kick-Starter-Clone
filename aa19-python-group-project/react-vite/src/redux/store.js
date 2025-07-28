import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger"; // 1. Import logger directly at the top
import sessionReducer from "./session";
import projectsReducer from "./projects";
import allCategoriesReducer from './allCategories';
import categoriesReducer from './categories';


const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectsReducer,
  allCategories: allCategoriesReducer,
  projectCategories: categoriesReducer,
});

let enhancer;

// 2. The setup is simplified for development mode
if (import.meta.env.MODE !== "production") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
} else {
  enhancer = applyMiddleware(thunk);
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;