import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import classes from "../styles/Account.module.css";
export default function Account() {
  const { currentUser, logout } = useAuth();
  return (
    <div className={classes.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>

      {!currentUser && (
        <>
          <Link to="/singup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {currentUser && (
        <>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout
          </span>
        </>
      )}
    </div>
  );
}
