import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../redux/projects';
import { fetchAllCategories } from '../../redux/allCategories'; 
import './CreateProjectForm.css';

function CreateProjectForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const allCategories = useSelector(state => Object.values(state.allCategories));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState(''); 
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

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

        const newProject = await dispatch(createProject(projectData));

        if (newProject && newProject.errors) {
            setErrors(newProject.errors);
        } else if (newProject) {
            navigate(`/projects/${newProject.id}`);
        }
    };

    return (
        <div className="create-project-form-container">
            <h1>Start a New Project</h1>
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
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>-- Select a Category --</option>
                        {allCategories.map(cat => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
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

                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}

export default CreateProjectForm;