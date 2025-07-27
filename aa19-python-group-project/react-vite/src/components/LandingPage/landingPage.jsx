import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { allProjects, fetchProjectsForCategory } from "../../redux/projects"; 
import { fetchAllCategories } from "../../redux/allCategories";
import { Link } from "react-router-dom";
import "./LandingPage.css"; 

function LandingPage() {
  const dispatch = useDispatch();

  // 3. Add local state to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const projects = useSelector((state) => state.projects.allProjects);
  const categories = useSelector((state) => Object.values(state.allCategories));

  useEffect(() => {
    
    if (selectedCategory) {
      // If a category is selected, fetch only those projects
      dispatch(fetchProjectsForCategory(selectedCategory));
    } else {
      // Otherwise, fetch all projects
      dispatch(allProjects());
    }
    // Always fetch the list of all categories for the dropdown
    dispatch(fetchAllCategories());
  }, [dispatch, selectedCategory]);

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
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
        <div className="auth-buttons">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </header>

      <div className="landing-controls">
        <input type="text" placeholder="Search projects..." className="search-bar" />
        <select className="sort-dropdown" onChange={handleCategorySelect} value={selectedCategory}>
          <option value="">Sort by Genre</option> {/* Changed text for clarity */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="campaign-grid">
        {projects.map((project) => (
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