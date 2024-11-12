import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TooltipButton from './TooltipButton';

import {
  faAreaChart,
  faGear,
  faHandPointRight,
  faHouseUser,
  faLayerGroup,
  faPowerOff,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { logoutSuccess } from "../features/auths/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutSuccess({ statusMsg: "Log out success!" }));
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-center">
      <div className="container-fluid">
        <div className="navbar-brand"></div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <FontAwesomeIcon icon={faHouseUser} className="pe-1" />
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/settings"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faGear} className="pe-1" /> Setting
                </Link>
                <ul
                  className="dropdown-menu dropdown-sm"
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{
                    width: "150px",
                    padding: "5px",
                    fontSize: "0.9rem",
                  }}
                >
                  <li>
                    <Link className="dropdown-item" to="/product">
                      <FontAwesomeIcon icon={faLayerGroup} className="pe-2" />{" "}
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/pos">
                      <FontAwesomeIcon
                        icon={faHandPointRight}
                        className="pe-2"
                      />{" "}
                      POS
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/shopping">
                      <FontAwesomeIcon icon={faLayerGroup} className="pe-2" />{" "}
                      Cart
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FontAwesomeIcon icon={faAreaChart} className="pe-1" />
                About
              </Link>
            </li>
          </ul>
          <div className="collapse navbar-collapse pr-5" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link rounded-5 ${isLoggedIn ? 'bg-btn-login': 'bg-btn-logout'} py-0`}
                  to="/login"
                  onClick={isLoggedIn ? handleLogout : null}
                >
                  <div className={`text-dark`}>
                    {/* {isLoggedIn ? "Sign out" : "Sign in"} */}
                    {isLoggedIn ? 
                    <TooltipButton tooltipText="Sign Out" placement="bottom">
                      <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-secondary" />
                    </TooltipButton>
                    : 
                    <>
                    <TooltipButton tooltipText="Sign In" placement="bottom">
                      <FontAwesomeIcon icon={faPowerOff} size="2x" className="text-secondary" />
                    </TooltipButton>
                    </>}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
