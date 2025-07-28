
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { individualProject, deleteProject } from "../../redux/projects";
import ProjectCategoryManager from './ProjectCategoryManager';
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current user from the session state
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

  const editProject = () => {
    navigate(`/projects/${project.id}/edit`);
  };

  const deleteTheProject = async () => {
    let letsDeleteProject = window.confirm("Are you sure you want to delete this project? This action cannot be undone.");
    
    if(letsDeleteProject == true) {
      console.log("deleting project...");
      const result = await dispatch(deleteProject(project.id));
      console.log("delete result:", result);
      navigate("/"); 
    } else {
      console.log("user cancelled delete");
    }
  };

    let projectOwner = false;
  if(sessionUser) {
    if(sessionUser.id === project.user_id) {
      projectOwner = true;
    }
  }

  return (
    <div className="project-details-container">
      <h1>{project.title}</h1>
      <img className="project-details-image" src={project.image_url} alt={project.title} />
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Goal:</strong> ${project.goal}</p>
      
      <p><strong>Ends in:</strong> {daysLeft(project.deadline)}</p>
      <p><strong>Creator:</strong> {project.creator}</p>

      <div className="project-details-buttons">
        <button>Donate</button>
        <button>Comment</button>


        {projectOwner && (
          <>
            <button onClick={editProject} className="edit-btn">
              Edit Project
            </button>
            <button onClick={deleteTheProject} className="delete-btn">
              Delete Project
            </button>
          </>
        )}
      </div>

      <hr />

    
      {sessionUser && sessionUser.id === project.user_id && (
        <ProjectCategoryManager projectId={project.id} />
      )}
    </div>
  );
}

export default ProjectDetails;