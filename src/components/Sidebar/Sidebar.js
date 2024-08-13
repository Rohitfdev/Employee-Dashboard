import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import f_logo from "../../Assets/header/f_logo.jpeg";
import {
  FaTachometerAlt,
  FaCommentDots,
  FaUserCheck,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaDollarSign,
  FaLayerGroup,
  FaCog,FaSearch,
} from "react-icons/fa"; 
import { MdDashboard } from "react-icons/md";
import { FaBuilding, FaUsers, FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { MdEvent } from "react-icons/md";

function Sidebar(props) {
  const [userType, setUserType] = useState("");
  const [roID, setRoId] = useState("");
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const [sidebarOpen, setSideBarOpen] = useState(true);

  const hideROTabs = () => {
    if (userType === "RO") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div
        className="sidebar sidebarOpen"
      >
        <div className="sidebar_cont">
          <div className="side_logo_cont">
            <img src={f_logo} alt="" className=" header_logo_img" />
          </div>
        </div>

        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-body">
            {/* Search Bar */}

            <div className="search-bar">
            <FaSearch className="search-icon" />
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            {/* Menu Items */}
            <div className="menu">
              <ul className="menu-list">
                <Link className="nav-link" to="/">
                  <li
                    className="menu-item"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <FaTachometerAlt className="menu-icon" />
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/feedback">
                  <li className="menu-item">
                    <FaCommentDots className="menu-icon" />
                    <span>Feedbacks</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/leave">
                  <li className="menu-item">
                    <FaUserCheck className="menu-icon" />
                    <span>Leaves</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/attendance">
                  <li className="menu-item">
                    <FaCalendarAlt className="menu-icon" />
                    <span>Attendance</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/daily-timesheet">
                  <li className="menu-item">
                    <FaClock className="menu-icon" />
                    <span>Daily Timesheet</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/work-log">
                  <li className="menu-item">
                    <FaClipboardList className="menu-icon" />
                    <span>Work Log</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/reimbursements">
                  <li className="menu-item">
                    <FaMoneyCheckAlt className="menu-icon" />
                    <span>Reimbursements</span>
                  </li>
                </Link>
              </ul>
              <hr />
              <ul className="menu-list">
                <Link className="nav-link" to="/reports">
                  <li className="menu-item">
                    <FaFileAlt className="menu-icon" />
                    <span>Reports</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/my-expenses">
                  <li className="menu-item">
                    <FaDollarSign className="menu-icon" />
                    <span>My Expenses</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/income">
                  <li className="menu-item">
                    <FaDollarSign className="menu-icon" />
                    <span>Income</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/categories">
                  <li className="menu-item">
                    <FaLayerGroup className="menu-icon" />
                    <span>Categories</span>
                  </li>
                </Link>
                <Link className="nav-link" to="/settings">
                  <li className="menu-item">
                    <FaCog className="menu-icon" />
                    <span>Settings</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {!loading && (
          <ul className="sidebarMain" style={{ fontFamily: "Poppins" }}>
            <li
              className={
                pathname === "/dashboard" || pathname === "/dashboard"
                  ? "active nav-item"
                  : "nav-item"
              }
            >
              <div
                className="dropdown"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                <div className="d-flex align-items-center gap-2">
                  <div className="icon">
                    <MdDashboard size={30} />
                  </div>

                  {sidebarOpen && (
                    <div className="dropdown-content">
                      <div className="flex_div">
                        <Link to="/dashboard">Dashboard</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center gap-2">
                <div className="icon">
                  <FaBuilding size={30} />
                </div>
              </div>
            </li>

            <li>
              <div className="dropdown">
                <div className="d-flex align-items-center gap-2">
                  <div className="icon">
                    <FaUsers size={30} />
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="dropdown">
                <div className="d-flex align-items-center gap-2">
                    <div className="icon">
                      <FaRegCalendarAlt size={30} />
                    </div>
                </div>
              </div>
            </li>

            <li>
              <div className="dropdown">
                <div className="d-flex align-items-center gap-2">
                    <div className="icon">
                      <AiOutlineFileText size={30} />
                    </div>
                </div>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center gap-2">
                  <div className="icon">
                    <FaDollarSign size={30} />
                  </div>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center gap-2">
                  <div className="icon">
                    <MdEvent size={30} />
                  </div>
              </div>
            </li>

            <li>
              <div className="dropdown">
                <div className="d-flex align-items-center gap-2">
                    <div className="icon">
                      <FaMoneyCheckAlt size={30} />
                    </div>
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;
