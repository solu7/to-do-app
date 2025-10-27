import { updateTask as updateTaskService, deleteTask as deleteTaskService } from "../services/tasksServices";

export const useTaskActions = (fetchTasks, onClose) => {

  const handleSaveTask = async (task, title, description) => {
    if (!task || !task.id) {
      console.error("No se puede guardar: Tarea no válida.");
      return;
    }

    const fieldsToUpdate = {};
    if (title !== task.title) {
      fieldsToUpdate.title = title;
    }
    if (description !== task.description) {
      fieldsToUpdate.description = description;
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      try {
        await updateTaskService({ taskId: task.id, ...fieldsToUpdate });
        console.log("Tarea actualizada correctamente.");
        fetchTasks();
      } catch (error) {
        console.error("Error al guardar la tarea:", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error("No se puede eliminar: ID de tarea no válido.");
      return;
    }

    try {
      await deleteTaskService(taskId);
      fetchTasks();
      onClose();
      console.log("Panel cerrado y tarea eliminada.");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return { handleSaveTask, handleDeleteTask };
};