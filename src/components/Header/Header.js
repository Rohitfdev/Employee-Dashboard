import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import accSettingImg from "../../Assets/header/account-settings-svgrepo-com.png";
import logoutImg from "../../Assets/header/logout-svgrepo-com.png";
import profileImg from "../../Assets/header/profile-circle-svgrepo-com.png";
function Header() {
  const [first_name, setFirstName] = useState("");

 
  const firstletterCapital = (string) => {
    if (typeof string === "string" && string.length > 0) {
      return string.replace(/^\w/, (match) => match.toUpperCase());
    }
    return string; 
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("usertype");
    localStorage.clear("channelPartnerId");
    navigate("/");
  };

  return (
    <nav className="navbar topbar">
      <div class="dropdown">
        <button
          class="btn  dropdown-toggle border-0 header_buttonfortoggle "
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span style={{ fontFamily: "Poppins" }}>
            Hello <b> {firstletterCapital(first_name)}</b>
          </span>

          <img
            src="/assets/images/Group 81936.png"
            alt=""
            className="img-fluid ms-1"
            style={{ width: "40px" }}
          />
        </button>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="#">
          <img src={profileImg} alt="" />
          Profile
          </a>
          <a class="dropdown-item" href="#">
          <img src={accSettingImg} alt="" />
          Account Setting
          </a>
          <a class="dropdown-item logoutContainer" href="#">
          {" "}
          <img src={logoutImg} alt="" />
          <li onClick={() => logout()}>Logout</li>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
