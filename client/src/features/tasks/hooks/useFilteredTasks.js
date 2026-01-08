import { useMemo } from "react";
import { useTasks } from "../../../context/TaskContext";
import { useFilters } from "../../../context/FilterContext";

export const useFilteredTasks = () => {
  const { tasksAll, isLoading, error } = useTasks();
  const { activeFilter } = useFilters();

  const tasks = useMemo(() => {
    if (!activeFilter.type || !activeFilter.value) {
      return tasksAll.filter((task) => !task.completed);
    }
    const filterKey = activeFilter.type;
    const filterValue = activeFilter.value.toString();

    return tasksAll.filter((task) => {
      const isPending = !task.completed;
      let matchesFilter = false;

      switch (filterKey) {
        case "priority":
          matchesFilter = task.priority?.toString() === filterValue;
          break;
        case "categoryId":
          matchesFilter = task.categories?.some(
            (cat) => cat.id.toString() === filterValue
          );
          break;
        case "tagId":
          matchesFilter = task.tags?.some(
            (tag) => tag.id.toString() === filterValue
          );
          break;
        default:
          matchesFilter = true;
      }
      return isPending && matchesFilter;
    });
  }, [tasksAll, activeFilter]);

  return {
    tasks,
    isLoading,
    error,
    filters: activeFilter,
  };
};
