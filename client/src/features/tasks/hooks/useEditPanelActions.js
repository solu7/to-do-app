import { useTasks } from "../../../context/TaskContext";
import { useTaskItemAction } from "./useTaskItemAction";
import {
  assignTagToTask,
  removeTagFromTask,
} from "../../filters/tags/services/tagsServices";
import {
  assignCategoryToTask,
  removeCategoryFromTask,
} from "../../filters/categories/services/categoriesServices";
import { toggleTaskCompletion } from "../services/tasksServices";

export const useEditPanelActions = (task) => {
  const { refreshAllLists } = useTasks();
  const { handleTaskItemAction } = useTaskItemAction();

  const handleMetadataAction = async (item, action, payloadKey) => {
    await handleTaskItemAction({
      task,
      item,
      action,
      refetch: refreshAllLists,
      payloadKey,
    });
  };

  const onToggleCompletion = async () => {
    try {
      await handleTaskItemAction({
        task,
        action: toggleTaskCompletion,
        refetch: refreshAllLists,
      });
    } catch (e) {
      console.error("Error toggling completion", e);
    }
  };

  return {
    actions: {
      assignTag: (tag) => handleMetadataAction(tag, assignTagToTask, "tagId"),
      removeTag: (tag) => handleMetadataAction(tag, removeTagFromTask, "tagId"),
      assignCategory: (cat) =>
        handleMetadataAction(cat, assignCategoryToTask, "categoryId"),
      removeCategory: (cat) =>
        handleMetadataAction(cat, removeCategoryFromTask, "categoryId"),
      toggleCompletion: onToggleCompletion,
      refreshAll: refreshAllLists,
    },
  };
};
