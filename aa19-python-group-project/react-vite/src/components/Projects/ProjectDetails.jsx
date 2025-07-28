import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { individualProject } from "../../redux/projects";
import { fetchRewardsForProject, deleteReward } from "../../redux/rewards";
import ProjectCategoryManager from './ProjectCategoryManager';
import RewardsModal from './RewardModal'; // Import RewardsModal component
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // 2. Get the current user from the session state
  const sessionUser = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.projects.currentProject);
  const rewards = useSelector((state) => state.rewards.rewards);

  const [showRewardsModal, setShowRewardsModal] = useState(false);

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
    dispatch(fetchRewardsForProject(projectId));
  };

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
      </div>

      <hr />

      {showRewardsModal && (
        <RewardsModal
          projectId={project.id}
          rewardCreated={handleRewardCreated}
          onClose={() => setShowRewardsModal(false)}
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
                  <button
                    className="delete-reward-button"
                    onClick={() => dispatch(deleteReward(reward.id))}
                    aria-label={`Delete reward ${reward.title}`}
                  >
                    ×
                  </button>
                </h3>
                <p>{reward.description}</p>
                <p><strong>Pledge Amount:</strong> ${reward.pledge_amount}</p>
                {reward.estimated_delivery && <p><strong>Estimated Delivery:</strong> {reward.estimated_delivery}</p>}
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
