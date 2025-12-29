import "./MoreActionsModal.css";
import { AnimatePresence, motion } from "framer-motion";
import logoutIcon from "../../assets/images/logout.png";
import homeIcon from "../../assets/images/home.png";
import gitHubIcon from "../../assets/images/gitHub.png";
import linkedInIcon from "../../assets/images/linkedIn.png";
import { useNavigation } from "../../../../core/hooks/useNavigation";
import { useExternalNavigation } from "../../../../core/hooks/useExternalNavigation";
import { logoutUser } from "../../../../features/auth/services/authServices";

function MoreActionsModal({ isOpen, onClose }) {
  const { goToGitHubProject, goToLinkedIn } = useExternalNavigation();
  const { goToHome, goLoginPage } = useNavigation();

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result.success) {
      goLoginPage();
    } else {
      console.error(result.error);
      alert("No se pudo cerrar la sesión: " + result.error);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal__overlay--invisible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.ul
            className="more-actions-modal__container"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <li
              className="more-actions-modal__item"
              role="button"
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="Close icon" />
              <p>Cerrar sesion</p>
            </li>
            <li
              className="more-actions-modal__item"
              role="button"
              onClick={goToHome}
            >
              <img src={homeIcon} alt="Home icon" />
              <p>Ir a la home page</p>
            </li>
            <li
              className="more-actions-modal__item"
              role="button"
              onClick={goToGitHubProject}
            >
              <img src={gitHubIcon} alt="Github logo" />
              <p>Codigo de la app</p>
            </li>
            <li
              className="more-actions-modal__item"
              role="button"
              onClick={goToLinkedIn}
            >
              <img src={linkedInIcon} alt="LinkedIn logo" />
              <p>Ir a linkedIn</p>
            </li>
          </motion.ul>
        </>
      )}
    </AnimatePresence>
  );
}
export default MoreActionsModal;
