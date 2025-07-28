import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { individualProject, updateProject } from '../../redux/projects';

function UpdateProjectForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams(); // Get the project ID from the URL

    // Get the project details from the Redux store
    const project = useSelector(state => state.projects.currentProject);
    
    // State for each form field
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    // Fetch the project's data when the component loads
    useEffect(() => {
        dispatch(individualProject(projectId));
    }, [dispatch, projectId]);

    // When the project data arrives, pre-populate the form fields
    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setGoal(project.goal);
            // The backend sends a full ISO string, but the date input needs YYYY-MM-DD format
            setDeadline(project.deadline ? project.deadline.split('T')[0] : '');
            setCategory(project.category);
            setImageUrl(project.image_url);
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const projectData = {
            title,
            description,
            goal: Number(goal),
            deadline,
            category,
            image_url: imageUrl,
        };

        const updatedProject = await dispatch(updateProject(projectId, projectData));

        if (updatedProject && updatedProject.errors) {
            setErrors(updatedProject.errors);
        } else if (updatedProject) {
            // If update is successful, navigate back to the project's detail page
            navigate(`/projects/${updatedProject.id}`);
        }
    };

    if (!project) return <h1>Loading...</h1>;

    return (
        <div className="update-project-form-container">
            <h1>Update Your Project</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="form-group">
                    <label>Funding Goal ($)</label>
                    <input
                        type="number"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        required
                        min="1"
                    />
                    {errors.goal && <p className="error">{errors.goal}</p>}
                </div>
                
                <div className="form-group">
                    <label>Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    {errors.deadline && <p className="error">{errors.deadline}</p>}
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g., Technology, Art, Games"
                    />
                     {errors.category && <p className="error">{errors.category}</p>}
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.png"
                    />
                     {errors.image_url && <p className="error">{errors.image_url}</p>}
                </div>

                <button type="submit">Update Project</button>
            </form>
        </div>
    );
}

export default UpdateProjectForm;