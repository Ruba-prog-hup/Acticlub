import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/UserSlice";

const defaultProfile =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const profileImg = user?.profilePic || defaultProfile;

  return (
    <Navbar className="navigation" expand="md">
      <div className="navs d-flex align-items-center w-100 justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={profileImg}
            alt="Profile"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              marginRight: "10px",
              objectFit: "cover",
              border: "2px solid #fff",
            }}
          />
          <span style={{ color: "#f5f7fa", fontWeight: 600 }}>
            {user?.uname || "Guest"}
          </span>
        </div>

        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/home" className="nav-link">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/ourgoal" className="nav-link">
              Our Goal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/location" className="nav-link">
              Our Location
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/yourAct" className="nav-link">
              Your Activity
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#logout"
              onClick={handleLogout}
              className="nav-link"
            >
              Sign out
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
