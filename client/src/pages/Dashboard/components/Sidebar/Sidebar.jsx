import "./Sidebar.css";

import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "../../../../core/hooks/useModal.js";
import userIcon from "../../assets/images/userIcon.png";
import configIcon from "../../assets/images/configIcon.png";
import closepanelIcon from "../../assets/images/closepanelIcon.png";
import projectsIcon from "../../assets/images/projectsIcon.png";
import helpIcon from "../../assets/images/helpIcon.png";
import AddTaskModal from "../../../../features/tasks/components/AddTaskModal/AddTaskModal.jsx";

import NavItem from "./components/NavItem.jsx";
import { navItems } from "./data/navItems.js";

function Sidebar({ username }) {
  const { modalIsOpen, openModal, closeModal } = useModal();
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
          <NavItem
            key={idx}
            {...item}
            onClick={item.action === "addTask" ? openModal : undefined}
          />
        ))}
      </ul>
      <AnimatePresence>
        {!!modalIsOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddTaskModal onClose={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>

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
