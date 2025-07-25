import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchProjectsForCategory, clearProjects } from '../../redux/projects';
import ProjectList from '../Projects/ProjectList';

function CategoryDetailPage() {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const projects = useSelector(state => state.projects.allProjects);

    useEffect(() => {
        if (categoryId) {
            // 1. Dispatch the clear action first
            dispatch(clearProjects());
            // 2. Then fetch the new data
            dispatch(fetchProjectsForCategory(categoryId));
        }
    }, [dispatch, categoryId]);

    // This loading guard will now work perfectly
    if (!projects.length) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="category-detail-page">
            <h2>Projects in this Category</h2>
            <ProjectList projects={projects} />
        </div>
    );
}

export default CategoryDetailPage;