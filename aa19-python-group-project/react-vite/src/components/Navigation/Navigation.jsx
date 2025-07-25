import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { fetchAllCategories } from '../../redux/allCategories';
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const categories = useSelector(state => Object.values(state.allCategories));

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <nav className="main-nav">
      {/* Top row for Home and Profile buttons */}
      <div className="nav-top-row">
        <NavLink to="/">Home</NavLink>
        <ProfileButton />
      </div>

      {/* Bottom row for category links */}
      <ul className="nav-category-row">
        {categories.map(category => (
          <li key={category.id}>
            <NavLink to={`/categories/${category.id}`}>
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;