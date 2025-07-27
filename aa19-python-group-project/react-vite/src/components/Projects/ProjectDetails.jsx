import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { individualProject } from "../../redux/projects";
import ProjectCategoryManager from './ProjectCategoryManager'; // 1. Import your new component
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // 2. Get the current user from the session state
  const sessionUser = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.projects.currentProject);

  useEffect(() => {
    dispatch(individualProject(projectId));
  }, [dispatch, projectId]);

  // A more robust loading check
  if (!project || project.id !== Number(projectId)) {
      return <h2>Loading...</h2>;
  }

  const daysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days left` : "Ended";
  };

  return (
    <div className="project-details-container">
      <h1>{project.title}</h1>
      <img className="project-details-image" src={project.image_url} alt={project.title} />
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Goal:</strong> ${project.goal}</p>
      {/* Note: Your model uses 'deadline', not 'end_date' */}
      <p><strong>Ends in:</strong> {daysLeft(project.deadline)}</p>
      {/* Use the dynamic creator name from the project data */}
      <p><strong>Creator:</strong> {project.creator}</p>

      <div className="project-details-buttons">
        <button>Donate</button>
        <button>Comment</button>
      </div>

      <hr />

      {/* 3. Conditionally render the manager component */}
      {/* This only shows up if a user is logged in AND they are the project owner */}
      {sessionUser && sessionUser.id === project.user_id && (
        <ProjectCategoryManager projectId={project.id} />
      )}
    </div>
  );
}

export default ProjectDetails;