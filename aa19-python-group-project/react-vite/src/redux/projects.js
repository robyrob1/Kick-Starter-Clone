const SET_PROJECTS = 'projects/setProjects';
const SET_PROJECT = 'projects/setProject';
const ADD_PROJECT = 'projects/addProject';


const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects
});

const setIndividualProject = (project) => ({
  type: SET_PROJECT,
  payload: project
});

const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project
});

// Thunks
export const allProjects = () => async (dispatch) => {
    const response = await fetch("/api/projects/");
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


// Reducers

const initialState ={
    allProjects: [],
    currentProject: null
};

function projectsReducer(state = initialState, action){
    switch(action.type) {
        case SET_PROJECTS:
            return {...state, allProjects: action.payload };
        case SET_PROJECT:
            return {...state, currentProject: action.payload};
        case ADD_PROJECT:
            return {...state, allProjects: [...state.allProjects, action.payload]};

        default:
           return state;
    }
}

export default projectsReducer;