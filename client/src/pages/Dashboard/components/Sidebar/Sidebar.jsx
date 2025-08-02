import "./Sidebar.css";

import userIcon from "../../assets/images/userIcon.png";
import configIcon from "../../assets/images/configIcon.png";
import closepanelIcon from "../../assets/images/closepanelIcon.png";
import projectsIcon from "../../assets/images/projectsIcon.png";
import helpIcon from "../../assets/images/helpIcon.png";

import NavItem from "./components/NavItem.jsx";
import { navItems } from "./data/navItems.js";

function Sidebar({username}) {
  return (
    <nav className="sidebar">
      <section className="sidebar-header">
        <div className="sidebar-user">
          <img className="sidebar-header-img" src={userIcon} alt="User icon" />
          <p>{username}</p>
        </div>
        <div className="sidebar-config">
          <img
            className="sidebar-header-img"
            src={configIcon}
            alt="Config icon"
          />
          <img
            className="sidebar-header-img"
            src={closepanelIcon}
            alt="Close panel icon"
          />
        </div>
      </section>

      <ul className="principal-nav">
        {navItems.map((item, idx) => (
          <NavItem key={idx} {...item} />
        ))}
      </ul>

      <section className="my-projects">
        <p>Mis proyectos</p>
        <div className="project">
          <img src={projectsIcon} alt="Project icon" />
          <p>Proyecto</p>
        </div>
      </section>

      <section className="sidebar-help">
        <img src={helpIcon} alt="Help icon" />
        <p>Mas</p>
      </section>
    </nav>
  );
}
export default Sidebar;
