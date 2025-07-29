import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import projectsReducer from "./projects";
import { allCategoriesReducer } from "./allCategories";
import { projectCategoriesReducer } from "./Categories"; // 👈 renamed import

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectsReducer,
  allCategories: allCategoriesReducer,
  categories: projectCategoriesReducer, // 👈 added this line
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
