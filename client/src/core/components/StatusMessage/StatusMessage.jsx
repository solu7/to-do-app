import "./StatusMessage.css"
import { motion, AnimatePresence } from "framer-motion";

const StatusMessage = ({ message, type = "success" }) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          className={`${type}-message-container`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{
            opacity: 0,
            height: 0,
            marginTop: 0,
            padding: "0 10px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <p className={`${type}-message`}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default StatusMessage;