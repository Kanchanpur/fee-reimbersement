import React, { useState } from 'react';
import { FaChevronDown, FaUserTie } from 'react-icons/fa';
import logo from '../Assets/images/logo.png'; // Image for expanded sidebar
import logosmall from '../Assets/images/logo-small.png'; // Image for collapsed sidebar
import './Layout.scss'; // Import the SCSS file
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineLibraryBooks, MdCastForEducation } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { AiOutlineIdcard } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar is initially collapsed
  const [settingsOpen, setSettingsOpen] = useState(false); // To control submenu visibility
  const [activeMenu, setActiveMenu] = useState("Education Fees"); // Track active menu item
  const navigate = useNavigate();
  const handleSidebarHover = (isHovering) => {
    setIsOpen(isHovering);
  };

  const toggleSettings = (event) => {
    event.stopPropagation();
    setSettingsOpen(prevState => !prevState);
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  return (
    <div className={`layout ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <div 
        className="sidebar"
        onMouseEnter={() => handleSidebarHover(true)}
        onMouseLeave={() => handleSidebarHover(false)}
      >
        <div className="sidebar-header">
          <img 
            src={isOpen ? logo : logosmall} 
            alt="Admin Dashboard Logo" 
            className={isOpen ? 'logo-expanded' : 'logo-collapsed'} 
          />
        </div>
        <ul className="sidebar-menu">
          <li className={activeMenu === "ICT Project Team Member" ? "active" : ""} onClick={() => handleMenuClick("ICT Project Team Member")}>
            <RiTeamLine className="menu-icon-item" />
            {isOpen && <span className="menu-text">ICT Project Team Member</span>}
          </li>
          <li className={activeMenu === "Learner Self Service" ? "active" : ""} onClick={() => handleMenuClick("Learner Self Service")}>
            <MdOutlineLibraryBooks className="menu-icon-item" />
            {isOpen && <span className="menu-text">Learner Self Service</span>}
          </li>
          <li className={activeMenu === "HR Self Service" ? "active" : ""} onClick={() => navigate("/Hrdashboard")}>
            <FaUserTie className="menu-icon-item" />
            {isOpen && <span className="menu-text">HR Self Service</span>}
          </li>
          <li className={`settings-item ${settingsOpen ? 'open' : ''}`} onClick={toggleSettings}>
            <div className="menu-item">
              <MdOutlineLibraryBooks className="menu-icon-item" />
              {isOpen && <span className="menu-text">Employee Self Service</span>}
              {isOpen && <FaChevronDown className={`submenu-arrow ${settingsOpen ? 'rotated' : ''}`} />}
            </div>
            <ul className={`submenu ${settingsOpen ? 'open' : ''}`}>
              <li className={`submenu-item ${activeMenu === "My Request" ? "active" : ""}`} onClick={() => handleMenuClick("My Request")}>
                <SlNote className="submenu-icon" />
                {isOpen && <span className="submenu-text">My Request</span>}
              </li>
              <li className={`submenu-item ${activeMenu === "My Immigration" ? "active" : ""}`} onClick={() => handleMenuClick("My Immigration")}>
                <AiOutlineIdcard className="submenu-icon" />
                {isOpen && <span className="submenu-text">My Immigration</span>}
              </li>
              <li className={`submenu-item ${activeMenu === "Education Fees" ? "active" : ""}`} onClick={() => navigate("/Dashboard")}>
                <MdCastForEducation className="submenu-icon" />
                {isOpen && <span className="submenu-text">Education Fees</span>}
              </li>
            </ul>
          </li>
        
        </ul>
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
