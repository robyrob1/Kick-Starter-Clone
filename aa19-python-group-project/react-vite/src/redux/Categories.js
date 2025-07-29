const LOAD_PROJECT_CATEGORIES = 'categories/LOAD_PROJECT_CATEGORIES';
const REMOVE_PROJECT_CATEGORY = 'categories/REMOVE_PROJECT_CATEGORY';

// Action Creators
const loadProjectCategories = (categories) => ({
    type: LOAD_PROJECT_CATEGORIES,
    categories
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
        dispatch(loadProjectCategories(data.categories));
    }
};

export const addCategoryToProject = (projectId, categoryId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id: categoryId })
    });

    if (response.ok) {
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

// Reducer
const projectCategoriesInitialState = {};
export function projectCategoriesReducer(state = projectCategoriesInitialState, action) {
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
        default:
            return state;
    }
}
