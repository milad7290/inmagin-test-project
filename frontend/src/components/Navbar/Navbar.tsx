import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../models/entities/user.entity";
import * as AuthService from "../../services/auth.service";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        Restaurant admin
      </Link>
      <div className="navbar-nav mr-auto">
        {currentUser && (
          <li className="nav-item">
            <span className="nav-link">
              Hi <b>{currentUser.name}</b>!
            </span>
          </li>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {/* {currentUser.username} */}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
