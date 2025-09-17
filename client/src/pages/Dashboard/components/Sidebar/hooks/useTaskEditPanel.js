import { useState, useEffect, useRef } from "react";
import useAutoGrowTextarea from "../../../../../core/hooks/useAutoGrowTextarea";
import { useResizer } from "../../../../../core/hooks/useResizer";

export const useTaskEditPanel = (task) => {
  const [taskEditPanelIsOpen, setTaskEditPanelIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [originalTask, setOriginalTask] = useState(null);

  const { elementWidth: panelWidth, elementRef: resizeHandleRef } = useResizer(
    0,
    0.98
  );

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const commentRef = useRef(null);

  useAutoGrowTextarea(titleRef, title);
  useAutoGrowTextarea(descriptionRef, description);
  useAutoGrowTextarea(commentRef, comment);

  useEffect(() => {
    if (task) {
      setOriginalTask({ ...task });
      setTitle(task.title || "");
      setDescription(task.description || "");
      setComment(task.comment || "Comentario de la tarea");
    }
  }, [task?.id]);

  const handleResetTask = () => {
    if (originalTask) {
      setTitle(originalTask.title || "");
      setDescription(originalTask.description || "");
      setComment(originalTask.comment || "Comentario de la tarea");
    }
  };

  const openTaskEditPanel = () => setTaskEditPanelIsOpen(true);
  const closeTaskEditPanel = () => setTaskEditPanelIsOpen(false);
  const toggleTaskEditPanel = () =>
    setTaskEditPanelIsOpen(!taskEditPanelIsOpen);

  return {
    taskEditPanelIsOpen,
    openTaskEditPanel,
    closeTaskEditPanel,
    toggleTaskEditPanel,
    panelWidth,
    titleRef,
    descriptionRef,
    commentRef,
    resizeHandleRef,
    handleResetTask,
    title,
    setTitle,
    description,
    setDescription,
    comment,
    setComment,
  };
};
