import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProjects } from "../../redux/projects";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.allProjects);

  useEffect(() => {
    dispatch(allProjects());
  }, [dispatch]);

  const daysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days left` : "Ended";
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">OriginFund</h1>
        <div className="auth-buttons">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </header>

      <div className="landing-controls">
        <input type="text" placeholder="Search projects..." className="search-bar" />
        <select className="sort-dropdown">
          <option>Sort by Genre</option>
          <option>Technology</option>
          <option>Art</option>
          <option>Games</option>
          <option>Education</option>
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
            <p><strong>Creator:</strong> TestUser101</p> {/* update with creator name if you fetch it */}
            <p>{daysLeft(project.end_date)}</p>
            <p><strong>Goal:</strong> ${project.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
