import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { individualProject } from "../../redux/projects";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.currentProject);

  useEffect(() => {
    dispatch(individualProject(projectId));
  }, [dispatch, projectId]);

  if (!project) return <h2>Loading...</h2>;

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
      <p><strong>Ends in:</strong> {daysLeft(project.end_date)}</p>
      <p><strong>Creator:</strong> TestUser101</p> {/* Replace with creator.username if available */}

      <div className="project-details-buttons">
        <button>Donate</button>
        <button>Comment</button>
      </div>
    </div>
  );
}

export default ProjectDetails;
