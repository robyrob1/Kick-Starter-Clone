import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

  const sessionUser = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.projects.currentProject);
  const rewards = useSelector((state) => state.rewards.rewards);

  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [rewardToEdit, setRewardToEdit] = useState(null);

  useEffect(() => {
    dispatch(individualProject(projectId));
    dispatch(fetchRewardsForProject(projectId));
  }, [dispatch, projectId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await dispatch(deleteProject(projectId));
      navigate('/');
    }
  };

  if (!project || project.id !== Number(projectId)) {
      return <h2>Loading...</h2>;
  }

  const isOwner = sessionUser && sessionUser.id === project.user_id;

  const daysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days left` : "Ended";
  };

  const handleRewardCreated = (newReward) => {
    setShowRewardsModal(false);
    setRewardToEdit(null);
    dispatch(fetchRewardsForProject(projectId));
  };

  const daysBetween = (dateString) => {
    if (!dateString) return 0;
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="project-details-page">
      <div className="project-main-content">
        <img className="project-details-image" src={project.image_url} alt={project.title} />

        <div className="project-info-panel">
          <h1>{project.title}</h1>
          <div className="project-categories-display">
            {project.categories && project.categories.map((categoryName, index) => (
              <span key={index} className="category-pill">{categoryName}</span>
            ))}
          </div>
          <p><strong>Creator:</strong> {project.creator}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Goal:</strong> ${project.goal}</p>
          <p><strong>Ends in:</strong> {daysLeft(project.deadline)}</p>
          <div className="project-details-buttons">
            <button>Donate</button>
            <button>Comment</button>
          </div>
          {isOwner && (
            <div className="owner-controls">
              <hr/>
              <Link to={`/projects/${project.id}/edit`}>
                <button>Update Project</button>
              </Link>
              <button onClick={handleDelete}>Delete Project</button>
              <button onClick={() => setShowRewardsModal(true)}>Manage Rewards</button>
              <ProjectCategoryManager projectId={project.id} />
            </div>
          )}
        </div>
      </div>

      {showRewardsModal && (
        <RewardsModal
          projectId={project.id}
          rewardCreated={handleRewardCreated}
          onClose={() => { setShowRewardsModal(false); setRewardToEdit(null); }}
          existingReward={rewardToEdit}
        />
      )}

      <section className="rewards-section">
        <h2>Rewards</h2>
        {rewards && rewards.length === 0 ? (
          <p>No rewards available for this project.</p>
        ) : (
          <ul className="rewards-list">
            {rewards && rewards.map((reward) => (
              <li key={reward.id} className="reward-item">
                <h3>{reward.title}</h3>
                <p>{reward.description}</p>
                <p><strong>Pledge Amount:</strong> ${reward.pledge_amount}</p>
                {reward.estimated_delivery && <p><strong>Estimated Delivery:</strong> {daysBetween(reward.estimated_delivery)} days</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProjectDetails;