import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);

  function calculatePercentage(){
    let percentage = (project.current_amount / project.goal) * 100;
     
    if (percentage > 100){
        percentage = 100;
    }
    return Math.round(percentage)
  } 

  function formatMoney(amount) {
    if (amount >= 1000) {
      return '$' + (amount / 1000).toFixed(1) + 'k';
    }
    return '$' + amount.toLocaleString();
  }

  function getDaysLeft() {
    let deadline = new Date(project.deadline);
    let today = new Date();
    let timeDiff = deadline.getTime() - today.getTime();
    let daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysLeft < 0) {
      return "Ended";
    } else if (daysLeft === 0) {
      return "Last day!";
    } else if (daysLeft === 1) {
      return "1 day left";
    } else {
      return daysLeft + " days left";
    }
  }

  function handleImageError() {
    setImageError(true);
  }

  let percentage = calculatePercentage();
  let deadlineText = getDaysLeft();
  let isFullyFunded = percentage >= 100;

  return (
    <Link to={`/projects/${project.id}`} className={`project-card-link`}>
    <div className={`project-card ${isFullyFunded ? 'fully-funded' : ''}`}>
      <div className="image-section">
        {project.image_url && !imageError ? (
          <img 
            src={project.image_url} 
            alt={project.title}
            className="project-img"
            onError={handleImageError}
          />
        ) : (
          <div className="no-image">
            <p>📸</p>
            <p>No Image Available</p>
          </div>
        )}
        
        {project.category && (
          <div className="category-tag">{project.category}</div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="title">{project.title}</h3>
        <p className="description">{project.description}</p>
        
        {project.creator && (
          <p className="creator">by {project.creator}</p>
        )}
        
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{width: percentage + '%'}}
            ></div>
          </div>
          
          <div className="stats">
            <div className="stat-item">
              <strong>{formatMoney(project.current_amount)}</strong>
              <br />
              <small>raised</small>
            </div>
            <div className="stat-item">
              <strong>{percentage}%</strong>
              <br />
              <small>funded</small>
            </div>
            <div className="stat-item">
              <strong className={deadlineText.includes('!') ? 'urgent' : ''}>
                {deadlineText}
              </strong>
              <br />
              <small>remaining</small>
            </div>
          </div>
          
          <div className="goal-info">
            <p>Goal: {formatMoney(project.goal)}</p>
          </div>
          
          {isFullyFunded && (
            <div className="success-message">
              Funding goal has been met!
            </div>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ProjectCard;