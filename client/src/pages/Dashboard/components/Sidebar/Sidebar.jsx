import "./Sidebar.css";
import { useAddTaskModal } from "../../../../features/tasks/hooks/useAddTaskModal.js";
import { motion } from "framer-motion";
import userIcon from "../../assets/images/userIcon.png";
import configIcon from "../../assets/images/configIcon.png";
import closepanelIcon from "../../assets/images/closepanelIcon.png";
import projectsIcon from "../../assets/images/projectsIcon.png";
import helpIcon from "../../assets/images/helpIcon.png";
import AddTaskModal from "../../../../features/tasks/components/AddTaskModal/AddTaskModal.jsx";

import NavItem from "./components/NavItem.jsx";
import { navItems } from "./data/navItems.js";

function Sidebar({ username, onClose, isOpen, openDashboardSidebar }) {
  const { addTaskModalIsOpen, openAddTaskModal, closeAddTaskModal } =
    useAddTaskModal();

  const sidebarVariants = {
    open: { transition: { duration: 0.8 } },
    closed: { transition: { duration: 0.8 } },
  };
  const arrowVariants = {
    open: { rotate: 0, transition: { duration: 0.02 } },
    closed: { rotate: 180, transition: { duration: 0.02 } },
  };
  return (
    <motion.nav
      className="sidebar"
      variants={sidebarVariants}
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      exit="closed"
    >
      {isOpen && (
        <motion.div
          className="sidebar-content-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0 }}
        >
          <section className="sidebar-header">
            <div className="sidebar-user">
              <img
                className="sidebar-header-img"
                src={userIcon}
                alt="User icon"
              />
              <p>{username}</p>
            </div>
          </section>

          <ul className="principal-nav">
            {navItems.map((item, idx) => (
              <NavItem
                key={idx}
                {...item}
                onClick={
                  item.action === "addTask" ? openAddTaskModal : undefined
                }
              />
            ))}
          </ul>
          <AddTaskModal
            onClose={closeAddTaskModal}
            AddTaskModalIsOpen={addTaskModalIsOpen}
          />

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
        </motion.div>
      )}
      <div className="sidebar-config">
        <img
          className="sidebar-config__icon"
          src={configIcon}
          alt="Config icon"
        />
        <motion.img
          className="sidebar-config__icon"
          src={closepanelIcon}
          alt="Close panel icon"
          role="button"
          onClick={isOpen ? onClose : openDashboardSidebar}
          variants={arrowVariants}
          animate={isOpen ? "open" : "closed"}
        />
      </div>
    </motion.nav>
  );
}
export default Sidebar;
