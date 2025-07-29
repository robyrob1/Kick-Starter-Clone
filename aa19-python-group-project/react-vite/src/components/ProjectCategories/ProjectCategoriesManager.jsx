import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProjectCategories,
  addCategoryToProject,
  removeCategoryFromProject
} from '../store/categories';

function ProjectCategoriesManager({ projectId, allCategories = [] }) {
  const dispatch = useDispatch();

  // 🔒 Prevent crash if state.categories is undefined
  const projectCategories = useSelector(state =>
    Object.values(state.categories || {})
  );

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch the project's categories when the component loads
    dispatch(getProjectCategories(projectId));
  }, [dispatch, projectId]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      dispatch(addCategoryToProject(projectId, selectedCategory));
      setSelectedCategory(''); // Reset dropdown
    }
  };

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategoryFromProject(projectId, categoryId));
  };

  // Filter out categories that are already assigned to the project
  const availableCategories = allCategories.filter(cat =>
    !projectCategories.some(projCat => projCat.id === cat.id)
  );

  return (
    <div>
      <h3>Manage Project Categories</h3>

      {/* Display current project categories */}
      <div className="current-categories">
        {projectCategories.map(category => (
          <div key={category.id} className="category-tag">
            {category.name}
            <button onClick={() => handleRemoveCategory(category.id)}>X</button>
          </div>
        ))}
      </div>

      {/* Form to add a new category */}
      <form onSubmit={handleAddCategory}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          {availableCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default ProjectCategoriesManager;
