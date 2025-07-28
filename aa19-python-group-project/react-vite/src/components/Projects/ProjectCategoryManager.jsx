import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectCategories, addCategoryToProject, removeCategoryFromProject } from '../../redux/categories'; 
import { fetchAllCategories } from '../../redux/allCategories'; 

function ProjectCategoryManager({ projectId }) {
    const dispatch = useDispatch();
    
    // Reads from state.projectCategories to match your store setup
    const projectCategories = useSelector(state => Object.values(state.projectCategories));
    
    const allCategories = useSelector(state => Object.values(state.allCategories));
    
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getProjectCategories(projectId));
        dispatch(fetchAllCategories());
    }, [dispatch, projectId]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            dispatch(addCategoryToProject(projectId, selectedCategory));
            setSelectedCategory('');
        }
    };

    const handleRemove = (categoryId) => {
        dispatch(removeCategoryFromProject(projectId, categoryId));
    };

    const availableCategories = allCategories.filter(
        globalCat => !projectCategories.some(projectCat => projectCat.id === globalCat.id)
    );

    return (
        <div className="category-manager">
            <h4>Manage Categories</h4>

            <div className="current-categories-list">
                {projectCategories.map(cat => (
                    <div key={cat.id} className="category-tag">
                        <span>{cat.name}</span>
                        <button onClick={() => handleRemove(cat.id)}>×</button>
                    </div>
                ))}
            </div>

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