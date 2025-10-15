import "./FilteredTasksView.css";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";

function FilteredTasksView() {
  const { tasks, isLoading, error, filters } = useFilteredTasks();

  const filterKey = Object.keys(filters)[0];
  const filterValue = filters[filterKey];

  const title = filterKey
    ? `Tareas Filtradas: ${filterKey} = ${filterValue}`
    : "Todas las Tareas Filtradas";

  if (isLoading) {
    return <div>Cargando tareas filtradas...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="filtered-tasks-view">
      <h2>
        {title} ({tasks.length})
      </h2>
      <hr />
      {tasks.length === 0 ? (
        <p>No se encontraron tareas con estos filtros.</p>
      ) : (
        <section className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
export default FilteredTasksView;
