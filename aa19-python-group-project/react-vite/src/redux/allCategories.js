const LOAD_CATEGORIES = 'categories/LOAD_ALL';

// Action Creators
const loadCategories = (categories) => ({
    type: LOAD_CATEGORIES,
    categories
});

// Thunks
export const fetchAllCategories = () => async (dispatch) => {
    const response = await fetch('/api/categories');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCategories(data.categories)); // Make sure your API returns `categories`
    }
};

// Reducer
const allCategoriesInitialState = {};
export function allCategoriesReducer(state = allCategoriesInitialState, action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
            const newState = {};
            action.categories.forEach(category => {
                newState[category.id] = category;
            });
            return newState;
        default:
            return state;
    }
}
