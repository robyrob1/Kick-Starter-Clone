import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// This thunk gets the categories for THIS project
import { getProjectCategories, addCategoryToProject, removeCategoryFromProject } from '../../redux/categories'; 
// This thunk gets ALL possible categories to populate the dropdown
import { fetchAllCategories } from '../../redux/allCategories'; 

// This component expects to receive the projectId as a prop
function ProjectCategoryManager({ projectId }) {
    const dispatch = useDispatch();
    
    // --- SELECTORS ---
    // Get the list of categories attached to THIS project from the 'categories' slice of state
    const projectCategories = useSelector(state => Object.values(state.categories));
    
    // Get the global list of ALL possible categories from the 'allCategories' slice of state
    const allCategories = useSelector(state => Object.values(state.allCategories));
    
    // --- LOCAL STATE ---
    // Manages the value of the dropdown menu
    const [selectedCategory, setSelectedCategory] = useState('');

    // --- SIDE EFFECTS ---
    useEffect(() => {
        // When the component loads, fetch both sets of data
        dispatch(getProjectCategories(projectId));
        dispatch(fetchAllCategories());
    }, [dispatch, projectId]);

    // --- HANDLERS ---
    const handleAdd = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            dispatch(addCategoryToProject(projectId, selectedCategory));
            setSelectedCategory(''); // Reset the dropdown after adding
        }
    };

    const handleRemove = (categoryId) => {
        dispatch(removeCategoryFromProject(projectId, categoryId));
    };

    // --- DERIVED STATE ---
    // To make the dropdown user-friendly, we only show categories that are NOT yet on the project
    const availableCategories = allCategories.filter(
        globalCat => !projectCategories.some(projectCat => projectCat.id === globalCat.id)
    );

    return (
        <div className="category-manager">
            <h4>Manage Categories</h4>

            {/* Requirement: View all categories on a project */}
            <div className="current-categories-list">
                {projectCategories.map(cat => (
                    <div key={cat.id} className="category-tag">
                        <span>{cat.name}</span>
                        {/* Requirement: Delete categories from a project */}
                        <button onClick={() => handleRemove(cat.id)}>×</button>
                    </div>
                ))}
            </div>

            {/* Requirement: Add categories to a project */}
            <form onSubmit={handleAdd} className="add-category-form">
                <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="" disabled>-- Add a category --</option>
                    {availableCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <button type="submit" disabled={!selectedCategory}>Add</button>
            </form>
        </div>
    );
}

export default ProjectCategoryManager;