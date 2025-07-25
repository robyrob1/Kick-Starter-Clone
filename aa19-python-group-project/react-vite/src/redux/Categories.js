const LOAD_PROJECT_CATEGORIES = 'categories/LOAD_PROJECT_CATEGORIES';
const ADD_PROJECT_CATEGORY = 'categories/ADD_PROJECT_CATEGORY';
const REMOVE_PROJECT_CATEGORY = 'categories/REMOVE_PROJECT_CATEGORY';


const loadProjectCategories = (categories) => ({
    type: LOAD_PROJECT_CATEGORIES,
    categories
});

const addProjectCategory = (category) => ({
    type: ADD_PROJECT_CATEGORY,
    category
});

const removeProjectCategory = (categoryId) => ({
    type: REMOVE_PROJECT_CATEGORY,
    categoryId
});

// Thunks
export const getProjectCategories = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/categories`);
    if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns {"categories": [...]}
        dispatch(loadProjectCategories(data.categories));
    }
};

// UPDATED to match your backend
export const addCategoryToProject = (projectId, categoryId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the categoryId in the request body
        body: JSON.stringify({ category_id: categoryId })
    });

    if (response.ok) {
        // Since the backend doesn't return the new category,
        // we can re-fetch the list to update the UI.
        dispatch(getProjectCategories(projectId));
    }
};

export const removeCategoryFromProject = (projectId, categoryId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/categories/${categoryId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeProjectCategory(categoryId));
    }
};


// Reducer (with a slight adjustment for the add action)
const initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PROJECT_CATEGORIES:
            const newState = {};
            action.categories.forEach(category => {
                newState[category.id] = category;
            });
            return newState;
        case REMOVE_PROJECT_CATEGORY:
            const updatedState = { ...state };
            delete updatedState[action.categoryId];
            return updatedState;
        // Since 'add' now re-fetches, we don't need a specific case for it.
        // The LOAD_PROJECT_CATEGORIES action will handle the update.
        default:
            return state;
    }
}