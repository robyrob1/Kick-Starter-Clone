import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate, useParams } from 'react-router-dom';
import { individualProject, updateProject } from '../../redux/projects';
import { fetchAllCategories } from '../../redux/allCategories'; 
import './CreateProjectForm.css';

function EditProjectForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();

    
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.projects.currentProject);
    const allCategories = useSelector(state => Object.values(state.allCategories));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [category, setCategory] = useState(''); 
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    
    useEffect(() => {
        dispatch(individualProject(projectId));
        dispatch(fetchAllCategories());
    }, [dispatch, projectId]);

    // fill in the form with project data
    useEffect(() => {
        if (project && project.id == Number(projectId)) {
            setTitle(project.title || '');
            setDescription(project.description || '');
            setGoal(project.goal || '');
            setDeadline(project.deadline || '');
            setCategory(project.category || ''); 
            setImageUrl(project.image_url || '');
        }
    }, [project, projectId]);

    // the loading screen
    if (!project || project.id != Number(projectId)) {
        return <h2>Loading...</h2>;
    }

    // checks if user can edit
    if (!sessionUser || sessionUser.id != project.user_id) {
        return <h2>Unauthorized</h2>;
    }

    const submitEditForm = async (e) => {
        e.preventDefault();
        setErrors({});

        const projectData = {
            title: title,
            description: description,
            goal: Number(goal),
            deadline: deadline,
            category: category,
            image_url: imageUrl,
        };

        const updatedProject = await dispatch(updateProject(projectId, projectData));

        if (updatedProject && updatedProject.errors) {
            setErrors(updatedProject.errors);
        } else if (updatedProject) {
            navigate(`/projects/${projectId}`);
        }
    };

    return (
        <div className="create-project-form-container">
            <h1>Edit Project</h1>
            <form onSubmit={submitEditForm}>
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

                <button type="submit">Update Project</button>
            </form>
        </div>
    );
}

export default EditProjectForm;