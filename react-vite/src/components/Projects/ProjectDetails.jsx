import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { individualProject, deleteProject } from "../../redux/projects";
import { fetchRewardsForProject, deleteReward } from "../../redux/rewards";
import ProjectCategoryManager from './ProjectCategoryManager';
import RewardsModal from './RewardModal';
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current user from the session state
  const sessionUser = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.projects.currentProject);
  const rewards = useSelector((state) => state.rewards.rewards);

  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [rewardToEdit, setRewardToEdit] = useState(null);

  useEffect(() => {
    dispatch(individualProject(projectId));
    dispatch(fetchRewardsForProject(projectId));
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

  const handleRewardCreated = (newReward) => {
    // Optionally handle the new reward, e.g., refresh project data or show a message
    setShowRewardsModal(false);
    setRewardToEdit(null);
    dispatch(fetchRewardsForProject(projectId));
  };

  const daysBetween = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Your edit/delete functions
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
        {sessionUser && sessionUser.id === project.user_id && (
          <button onClick={() => setShowRewardsModal(true)}>Add Rewards</button>
        )}
        
        {/* Your edit/delete buttons */}
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

      {showRewardsModal && (
        <RewardsModal
          projectId={project.id}
          rewardCreated={handleRewardCreated}
          onClose={() => {
            setShowRewardsModal(false);
            setRewardToEdit(null);
          }}
          existingReward={rewardToEdit}
        />
      )}

      <section className="rewards-section">
        <h2>Rewards</h2>
        {rewards.length === 0 ? (
          <p>No rewards available for this project.</p>
        ) : (
          <ul className="rewards-list">
            {rewards.map((reward) => (
              <li key={reward.id} className="reward-item">
                <h3>
                  {reward.title}
                  {sessionUser && sessionUser.id === project.user_id && (
                    <>
                      <button
                        className="edit-reward-button"
                        onClick={() => {
                          setShowRewardsModal(true);
                          setRewardToEdit(reward);
                        }}
                        aria-label={`Edit reward ${reward.title}`}
                      >
                        ✎
                      </button>
                      <button
                        className="delete-reward-button"
                        onClick={() => dispatch(deleteReward(reward.id))}
                        aria-label={`Delete reward ${reward.title}`}
                      >
                        ×
                      </button>
                    </>
                  )}
                </h3>
                <p>{reward.description}</p>
                <p><strong>Pledge Amount:</strong> ${reward.pledge_amount}</p>
                {reward.estimated_delivery && <p><strong>Estimated Delivery:</strong> {daysBetween(reward.estimated_delivery)} days</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    
      {sessionUser && sessionUser.id === project.user_id && (
        <ProjectCategoryManager projectId={project.id} />
      )}
    </div>
  );
}

export default ProjectDetails;