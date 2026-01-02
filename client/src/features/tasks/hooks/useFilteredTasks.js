import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks } from "../../../context/TaskContext";

export const useFilteredTasks = () => {
  const [searchParams] = useSearchParams();
  const { tasksAll, isLoading, error } = useTasks();
  const filters = Object.fromEntries(searchParams.entries());

  const tasks = useMemo(() => {
    const filterKey = Object.keys(filters).find((key) => key !== "name");
    const filterValue = filters[filterKey];

    if (!filterKey || !filterValue) return tasksAll;

    return tasksAll.filter((task) => {
      const isPending = !task.completed;
      const value = filterValue.toString();
      let matchesFilter = false;

      switch (filterKey) {
        case "priority":
          matchesFilter = task.priority?.toString() === value;
          break;
        case "categoryId":
          matchesFilter = task.categories?.some(
            (cat) => cat.id.toString() === value
          );
          break;
        case "tagId":
          matchesFilter = task.tags?.some((tag) => tag.id.toString() === value);
          break;
        default:
          matchesFilter = true;
      }
      return isPending && matchesFilter;
    });
  }, [tasksAll, searchParams]);

  return {
    tasks,
    isLoading,
    error,
    filters,
  };
};
