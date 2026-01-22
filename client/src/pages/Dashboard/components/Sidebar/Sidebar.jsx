import "./Sidebar.css";
import { useModal } from "../../../../features/tasks/hooks/useModal.js";
import { motion, AnimatePresence } from "framer-motion";
import userIcon from "../../assets/images/userIcon.png";
import configIcon from "../../assets/images/configIcon.png";
import closepanelIcon from "../../assets/images/closepanelIcon.png";
import projectsIcon from "../../assets/images/projectsIcon.png";
import helpIcon from "../../assets/images/helpIcon.png";
import AddTaskModal from "../../../../features/tasks/components/AddTaskModal/AddTaskModal.jsx";
import MoreActionsModal from "../MoreActionsModal/MoreActionsModal.jsx";
import NavItem from "./components/NavItem.jsx";
import { navItems } from "./data/navItems.js";
import UserPanel from "../../../../features/user/components/UserPanel.jsx";
import { useUser } from "../../../../context/UserContext.jsx";
import { SessionTimer } from "../../../../core/components/SessionTimer/SessionTimer.jsx";

const contentVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.3 } },
  closed: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const arrowVariants = {
  open: { rotate: 0, transition: { duration: 0.2 } },
  closed: { rotate: 180, transition: { duration: 0.2 } },
};

function Sidebar({ username, onClose, isOpen, openDashboardSidebar }) {
  const { userData } = useUser();
  const isGuest = userData?.is_guest;
  const addTaskModal = useModal();
  const userPanelModal = useModal();
  const moreActionsModal = useModal();

  return (
    <>
      <motion.nav
        className="sidebar"
        layout
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="sidebar-content"
              className="sidebar-content-wrapper"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {isGuest && (
                <div className="sidebar__guest-timer">
                  <p>Sesión de invitado expira en: </p>
                  <SessionTimer />
                </div>
              )}
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
                {navItems.map((item) => (
                  <NavItem
                    key={item.name}
                    {...item}
                    onClick={
                      item.action === "addTask" ? addTaskModal.open : undefined
                    }
                  />
                ))}
              </ul>
              <AddTaskModal
                onClose={addTaskModal.close}
                isOpen={addTaskModal.isOpen}
              />

              <section className="my-projects">
                <p>Mis proyectos</p>
                <div className="project">
                  <img src={projectsIcon} alt="Project icon" />
                  <p>Proyecto</p>
                </div>
              </section>

              <section
                className="sidebar-help"
                onClick={moreActionsModal.toggle}
              >
                <img src={helpIcon} alt="Help icon" />
                <p>Mas</p>
                <MoreActionsModal
                  onClose={moreActionsModal.close}
                  isOpen={moreActionsModal.isOpen}
                />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="sidebar-config">
          <img
            className="sidebar-config__icon"
            src={configIcon}
            alt="Config icon"
            role="button"
            onClick={userPanelModal.open}
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
      <UserPanel
        isOpen={userPanelModal.isOpen}
        onClose={userPanelModal.close}
      />
    </>
  );
}
export default Sidebar;
