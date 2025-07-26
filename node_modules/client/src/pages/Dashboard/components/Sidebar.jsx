import "./Sidebar.css";
import { Link } from "react-router-dom";

import addIcon from "../assets/images/addIcon.svg";
import todayIcon from "../assets/images/todayIcon.png";
import upcomingIcon from "../assets/images/upcomingIcon.png";
import labelsIcon from "../assets/images/tagIcon.png";
import completedIcon from "../assets/images/completedIcon.png";
import userIcon from "../assets/images/userIcon.png";
import configIcon from "../assets/images/configIcon.png";
import closepanelIcon from "../assets/images/closepanelIcon.png";
import projectsIcon from "../assets/images/projectsIcon.png";
import helpIcon from "../assets/images/helpIcon.png";
import inboxIcon from "../assets/images/inboxIcon.png";

function Sidebar() {
  return (
    <nav className="sidebar">
      <section className="sidebar-header">
        <div className="sidebar-user">
          <img
            className="sidebar-header-img"
            src={userIcon}
            alt="User icon"
          />
          <p>Username</p>
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
        <Link className="principal-nav-link">
          <img
            className="principal-nav-img"
            src={addIcon}
            alt="Add task icon"
          />
          <li>Add task</li>
        </Link>
        <Link className="principal-nav-link">
          <img
            className="principal-nav-img"
            src={inboxIcon}
            alt="Inbox icon"
          />
          <li>Inbox</li>
        </Link>
        <Link className="principal-nav-link">
          <img
            className="principal-nav-img"
            src={todayIcon}
            alt="Today icon"
          />
          <li>Today</li>
        </Link>
        <Link className="principal-nav-link">
          <img
            className="principal-nav-img"
            src={upcomingIcon}
            alt="Whats next icon"
          />
          <li>¿What's next?</li>
        </Link>
        <Link className="principal-nav-link">
          <img
            className="principal-nav-img"
            src={labelsIcon}
            alt="Labels icon"
          />
          <li>Filters & labels</li>
        </Link>
        <Link className="principal-nav-link">
          <img
            className="principal-nav-img"
            src={completedIcon}
            alt="Completed icon"
          />
          <li>Completed</li>
        </Link>
      </ul>

      <section className="my-projects">
        <p>My projects</p>
        <div className="project">
          <img src={projectsIcon} alt="Project icon" />
          <p>Project</p>
        </div>
      </section>

      <section className="sidebar-help">
        <img src={helpIcon} alt="Help icon" />
        <p>Help</p>
      </section>
    </nav>
  );
}
export default Sidebar;
