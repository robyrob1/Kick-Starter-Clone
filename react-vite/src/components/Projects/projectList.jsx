import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProjects } from "../../redux/projects";

function ProjectsList() {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.allProjects);

    useEffect(() => {
        dispatch(allProjects());
    }, [dispatch]);

    return(<div>
            <h1>All Projects</h1>
            {projects.map(project => (
                <div key={project.id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>Goal: ${project.goal}</p>
                    <p>Raised: ${project.current_amount}</p>
                </div>
            ))}
        </div>
    );

}

    export default ProjectsList;