import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProjects } from "../../redux/projects";
import ProjectCard from "./ProjectCard";
import './Projects.css';

function ProjectList() {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.allProjects);

    useEffect(() => {
        dispatch(allProjects());
    }, [dispatch]);

     return (
        <div>
            <h1>StartKicker Projects</h1>
            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default ProjectList;