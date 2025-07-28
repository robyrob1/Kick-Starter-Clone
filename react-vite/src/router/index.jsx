import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProjectDetails from "../components/Projects/ProjectDetails";
import CreateProjectForm from '../components/Projects/CreateProjectForm';
import EditProjectForm from '../components/Projects/EditProjectForm';
import LandingPage from '../components/LandingPage/landingPage'; 

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />, 
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
          {
        path: "projects/new",
        element: <CreateProjectForm />,
      },

  
      {
        path: "projects/:projectId/edit",
        element: <EditProjectForm />,
      },

            {
        path: "projects/:projectId",
        element: <ProjectDetails />,
      },

    ],
  },
]);
