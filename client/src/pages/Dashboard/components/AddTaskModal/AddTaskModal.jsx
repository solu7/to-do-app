import "./AddTaskModal.css";

const AddTaskModal = () => {
  return (
    <div className="task-modal">
      <section className="task-modal-main">
        <input
          className="task-modal-input title"
          type="text"
          placeholder="Titulo de la tarea"
        />
        <input
          className="task-modal-input desc"
          type="text"
          placeholder="Descripcion"
        />
      </section>
      <section className="task-modal-filters">
        <div>
          <img src="" alt="" />
          <button className="modal-filter-button">Fecha</button>
        </div>
        <div>
          <img src="" alt="" />
          <button className="modal-filter-button">Prioridad</button>
        </div>
        <div>
          <img src="" alt="" />
          <button className="modal-filter-button">Categoria</button>
        </div>
        <div>
          <img src="" alt="" />
          <button className="modal-filter-button">Tag</button>
        </div>
      </section>
      <section className="task-modal-buttons">
        <button className="task-modal-add-btn">Añadir tarea</button>
        <button className="task-modal-second-btn">Cancelar</button>
      </section>
    </div>
  );
};
export default AddTaskModal;
