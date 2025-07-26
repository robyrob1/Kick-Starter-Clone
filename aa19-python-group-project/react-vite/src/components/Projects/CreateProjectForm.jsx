import { useState } from 'react';

function CreateProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
    if (month < 10) {
        month = '0' + month;
  }
    if (day < 10) {
         day = '0' + day;
  }

  const todayDate = year + '-' + month + '-' + day;
  // this is for button state when all fields are filled out by user
  const allFieldsFilled = title && description && category && goal && deadline;


function handleSubmit(e) {
    e.preventDefault();


    if (!title) {
      alert('Please enter a title');
      return;
    }
    if (!description) {
      alert('Please enter a description');
      return;
    }
    if (!category) {
      alert('Please select a category');
      return;
    }
    if (!goal || goal <= 0) {
      alert('Please enter a valid goal amount');
      return;
    }
    if (!deadline) {
      alert('Please select a deadline');
      return;
    }


    const selectedDate = new Date(deadline);
    const today = new Date();
    if (selectedDate <= today) {
      alert('Deadline must be in the future');
      return;
    }

    setIsSubmitting(true);


    const newProject = {
      title: title,
      description: description,
      category: category,
      goal: parseInt(goal),
      deadline: deadline,
      image_url: imageUrl
    };

    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to create project');
      }
    })
    .then(data => {
      alert('Project created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setGoal('');
      setDeadline('');
      setImageUrl('');
      setIsSubmitting(false);
    })
    .catch(error => {
      console.log('Error:', error);
      alert('Error creating project. Please try again.');
      setIsSubmitting(false);
    });
  }

return (
    <div className="create-project-form">
      
      <h1>Create your StartKicker Project fund!</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title for the campaign"
          />
        </div>

        <div className="form-group">
          <label>Cover Image</label>
          <input 
            type="url" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <small>User will upload a cover image to showcase on Campaign page and Landing Page</small>
        </div>

        <div className="form-group">
          <label>Funding Goal</label>
          <input 
            type="number" 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="5000"
            min="1"
          />
          <small>A set goal for users to aim towards</small>
        </div>

        <div className="form-group">
          <label>Campaign Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A description or story attached to the campaign. Telling users why they should donate to this campaign"
            rows="5"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Genre</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">User will choose a genre for what the campaign will be closest associated with</option>
            <option value="Technology">Technology</option>
            <option value="Games">Games</option>
            <option value="Art">Art</option>
            <option value="Film & Video">Film & Video</option>
            <option value="Music">Music</option>
            <option value="Food & Drink">Food & Drink</option>
          </select>
        </div>

        <div className="form-group">
          <label>Campaign End Date</label>
          <input 
            type="date" 
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={todayDate}
          />
          <small>The last day for which the fund will be open for. Users can not donate past this date</small>
        </div>

        <div className="preview-section">
          <h3>Preview</h3>
          <div className="project-preview">
            <h4>{title || "Your Project Title"}</h4>
            <p><strong>Category:</strong> {category || "Not selected"}</p>
            <p><strong>Goal:</strong> ${goal || "0"}</p>
            <p><strong>Deadline:</strong> {deadline || "Not set"}</p>
            <p>{description || "Your project description will appear here..."}</p>
            {imageUrl && (
              <div className="preview-image">
                <img src={imageUrl} alt="Project preview" style={{maxWidth: '200px', maxHeight: '150px'}} />
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className={`create-fund-button ${!allFieldsFilled || isSubmitting ? 'disabled' : ''}`}
          disabled={!allFieldsFilled || isSubmitting}
        >
          {isSubmitting ? 'CREATING FUND...' : 'CREATE FUND'}
        </button>
      </form>

      <div className="form-note">
        <p>Create fund button is greyed out until all fields have been filled in</p>
      </div>
    </div>
  );
}

export default CreateProjectForm;
