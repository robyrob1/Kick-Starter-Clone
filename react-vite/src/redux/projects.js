const SET_PROJECTS = 'projects/setProjects';
const SET_PROJECT = 'projects/setProject';
const ADD_PROJECT = 'projects/addProject';
const REMOVE_PROJECT = 'projects/removeProject';
const CLEAR_PROJECTS = 'projects/clearProjects';
const SET_CATEGORY_FILTER = 'projects/setCategoryFilter';

// Action Creators
const setProjects = (projects) => ({ type: SET_PROJECTS, payload: projects });
const setIndividualProject = (project) => ({ type: SET_PROJECT, payload: project });
const addProject = (project) => ({ type: ADD_PROJECT, payload: project });
const removeProject = (projectId) => ({ type: REMOVE_PROJECT, payload: projectId });
export const clearProjects = () => ({ type: CLEAR_PROJECTS });
export const setCategoryFilter = (categoryId) => ({ type: SET_CATEGORY_FILTER, payload: categoryId });

// Thunks
export const allProjects = () => async (dispatch) => {
    // Add { cache: 'no-cache' } to prevent the browser from returning a 304 status
    const response = await fetch("/api/projects/", { cache: 'no-cache' });
    if (response.ok){
        const data = await response.json();
        dispatch(setProjects(data.projects));
    }
};

export const individualProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`);
    if (response.ok){
        const data = await response.json();
        dispatch(setIndividualProject(data));
    }
};

export const createProject = (projectData) => async (dispatch) => {
    const response = await fetch("/api/projects/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(projectData)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(addProject(data));
        return data;
    } else if (response.status < 500){
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
};

export const fetchProjectsForCategory = (categoryId) => async (dispatch) => {
    const response = await fetch(`/api/categories/${categoryId}/projects`);
    if (response.ok) {
        const projectsForCategory = await response.json();
        dispatch(setProjects(projectsForCategory));
    }
};

export const updateProject = (projectId, projectData) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
    });
    if (response.ok) {
        const updatedProject = await response.json();
        dispatch(setIndividualProject(updatedProject));
        return updatedProject;
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removeProject(projectId));
    }
};

// Reducer
const initialState = {
    allProjects: [],
    currentProject: null,
    categoryFilter: null
};

function projectsReducer(state = initialState, action) {
    switch(action.type) {
        case SET_PROJECTS:
            return {...state, allProjects: action.payload };
        case SET_PROJECT:
            return {...state, currentProject: action.payload};
        case ADD_PROJECT: {
            const allProjectsArray = Array.isArray(state.allProjects) ? state.allProjects : [];
            return {...state, allProjects: [...allProjectsArray, action.payload]};
        }
        case REMOVE_PROJECT: {
            const newAllProjects = state.allProjects.filter(p => p.id !== action.payload);
            return { ...state, allProjects: newAllProjects, currentProject: null };
        }
        case CLEAR_PROJECTS:
            return { ...state, allProjects: [] };
        case SET_CATEGORY_FILTER:
            return { ...state, categoryFilter: action.payload };
        default:
           return state;
    }
}

export default projectsReducer;