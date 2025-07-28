import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { setCategoryFilter } from "../../redux/projects"; // Import the new action
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleHomeClick = () => {
    // When the user clicks "Home", clear the category filter in the Redux store
    dispatch(setCategoryFilter(null));
  };

  return (
    <nav className="main-nav">
      <ul className="nav-links">
        <li>
          <NavLink to="/" onClick={handleHomeClick}>Home</NavLink>
        </li>
        {sessionUser && (
          <li>
            <NavLink to="/projects/new">Create a Project</NavLink>
          </li>
        )}
      </ul>
      <div className="profile-button-container">
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;