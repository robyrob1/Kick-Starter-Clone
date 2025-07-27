import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllCategoriesPage from '../components/Categories/AllCategoriesPage';
import CategoryDetailPage from '../components/Categories/CategoryDetailPage';
import ProjectDetails from "../components/Projects/ProjectDetails";
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
        path: "categories",
        element: <AllCategoriesPage />,
      },
      {
        path: "categories/:categoryId",
        element: <CategoryDetailPage />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetails />,
      },
    ],
  },
]);
