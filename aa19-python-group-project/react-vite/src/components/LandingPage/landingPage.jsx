import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProjects, fetchProjectsForCategory, setCategoryFilter } from "../../redux/projects"; 
import { fetchAllCategories } from "../../redux/allCategories";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.allProjects);
  const categories = useSelector((state) => Object.values(state.allCategories));
  const selectedCategory = useSelector((state) => state.projects.categoryFilter);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProjectsForCategory(selectedCategory));
    } else {
      dispatch(allProjects());
    }
    dispatch(fetchAllCategories());
  }, [dispatch, selectedCategory]);

  const handleCategorySelect = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  const daysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days left` : "Ended";
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">StartKicker</h1>
        {/* The login and signup buttons have been removed from this section */}
      </header>

      <div className="landing-controls">
        <input type="text" placeholder="Search projects..." className="search-bar" />
        <select className="sort-dropdown" onChange={handleCategorySelect} value={selectedCategory || ""}>
          <option value="">All Genres</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="campaign-grid">
        {projects && projects.map((project) => (
          <div className="campaign-card" key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <img src={project.image_url} alt={project.title} className="campaign-img" />
            </Link>
            <Link to={`/projects/${project.id}`} className="project-title-link">
              <h3>{project.title}</h3>
            </Link>
            <p><strong>Creator:</strong> {project.creator}</p>
            <p>{daysLeft(project.deadline)}</p>
            <p><strong>Goal:</strong> ${project.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;