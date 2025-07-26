import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllCategories } from '../../redux/allCategories';

function AllCategoriesPage() {
    const dispatch = useDispatch();
    const categories = useSelector(state => Object.values(state.allCategories));

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    if (!categories.length) {
        return <div>Loading categories...</div>;
    }

    return (
        <div className="all-categories-container">
            <h1>All Categories</h1>
            <div className="category-list">
                {categories.map(category => (
                    <div key={category.id} className="category-list-item">
                        <NavLink to={`/categories/${category.id}`}>
                            {category.name}
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllCategoriesPage;