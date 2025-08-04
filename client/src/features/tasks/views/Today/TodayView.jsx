import "./TodayView.css";
import {useModal} from "../../../../core/hooks/useModal.js"
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";

function Today() {
const { modalIsOpen, openModal, closeModal } = useModal();
  return (
    <div className="today">
      <h3 className="today-title">
        Lo que tienes <span>para hoy</span>
      </h3>
      <section className="today-tasks">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </section>
      <AddTaskButton onClick={openModal} />

      <AnimatePresence>
        {!!modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddTaskModal onClose={closeModal}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Today;
