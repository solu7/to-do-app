import "./TodayView.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";

function Today() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
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
      <AddTaskButton onClick={handleModal} />

      <AnimatePresence>
        {!!modalIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <AddTaskModal isOpen={modalIsOpen} onClose={handleModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Today;
