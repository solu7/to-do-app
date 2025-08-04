import "./EditPanel.css";

function EditPanel() {
  return (
    <div className="edit-panel">
      <section className="edit-panel__items">
        <p>Agregaste la tarea Ayer</p>
        <input type="checkbox" />
      </section>
      <section>
        <h3>Titulo de la tarea</h3>
        <p>Descripcion de la tarea, aqui va toda esa info</p>
        <p>Comentario de la tarea</p>
      </section>
      <section>
        <div>
          <img src="" alt="Icon" />
          <p>Prioridad</p>
        </div>
        <div>
          <img src="" alt="Icon" />
          <p>Tags</p>
        </div>
        <div>
          <img src="" alt="Icon" />
          <p>Categorias</p>
        </div>
        <div>
          <img src="" alt="Icon" />
          <p>Eliminar</p>
        </div>
      </section>
    </div>
  );
}
export default EditPanel;
