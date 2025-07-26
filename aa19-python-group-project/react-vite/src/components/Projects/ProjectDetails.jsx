import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allProjects } from '../../redux/projects';
import './Projects.css';

function ProjectDetails() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.allProjects);
  const [donationAmount, setDonationAmount] = useState('');

  console.log('projectId from URL:', projectId);
  console.log('projects from Redux:', projects);


  useEffect(() => {
    
    if (!projects) {
      dispatch(allProjects());
    }
  }, [dispatch, projects]);

  if (!projects) {
    return <div>Loading...</div>;
  }
  const project = projects.find(p => p.id === parseInt(projectId));
  
  console.log('found project:', project);
  console.log('looking for ID:', parseInt(projectId));
  console.log('available project IDs:', projects.map(p => p.id));



  if (!project) {
    return <div>Project not found</div>;
  }

  function calculatePercentage(){
    let percentage = (project.current_amount / project.goal) * 100;
     
    if (percentage > 100){
        percentage = 100;
    }
    return Math.round(percentage)
  } 

 function getDaysLeft() {
    
    let deadline = new Date(project.deadline);
    let today = new Date();
    let timeDiff = deadline.getTime() - today.getTime();
    let daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
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

  let percentage = calculatePercentage();
  let daysText = getDaysLeft();
  let isFullyFunded = percentage >= 100;

function handleDonate() {
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    alert(`Thanks for donating $${donationAmount} to "${project.title}"!`);
    setDonationAmount('');
  }

    return (
    <div className="project-details">
 
      
      <div className="project-header">
        <div className="project-image">
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} />
          ) : (
            <div className="no-image">
              <p>📸</p>
              <p>No Image Available</p>
            </div>
          )}
        </div>
        
        <div className="project-info">
          <div className="category">{project.category}</div>
          <h1>{project.title}</h1>
          <p>by {project.creator || `User #${project.user_id}`}</p>
          
          <div className="money-info">
            <div className="big-money">${project.current_amount}</div>
            <div className="small-text">pledged of ${project.goal} goal</div>
            
            <div className="stats">
              <div className="stat">
                <strong>{percentage}%</strong> funded
              </div>
              <div className="stat">
                <strong>{daysText}</strong>
              </div>
            </div>
          </div>
          
          <div className="progress-bar" style={{width: '100%', height: '20px', backgroundColor: '#eee'}}>
            <div 
              className="progress" 
              style={{
                width: percentage + '%',
                height: '100%',
                backgroundColor: percentage >= 100 ? 'green' : 'blue'
              }}
            ></div>
          </div>
          
          {!daysText.includes('Ended') && (
            <div className="donate-section">
              <input 
                type="number" 
                placeholder="Enter amount" 
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <button onClick={handleDonate}>Back This Project</button>
            </div>
          )}

          {isFullyFunded && (
            <div className="success-message">
              🎉 This project has been successfully funded!
            </div>
          )}

          {daysText.includes('Ended') && (
            <div className="ended-message">
              This campaign has ended.
            </div>
          )}
        </div>
      </div>
      
      <div className="project-description">
        <h2>About this project</h2>
        <p>{project.description}</p>
      </div>
    </div>
  );
}

export default ProjectDetails;