import { useState, useEffect, useRef, useCallback } from "react";
import useAutoGrowTextArea from "../../../../../core/hooks/useAutoGrowTextarea";

export const useTaskEditPanel = (task) => {
  const [taskEditPanelIsOpen, setTaskEditPanelIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [originalTask, setOriginalTask] = useState(null);
  const adjustHeight = useAutoGrowTextArea();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const commentRef = useRef(null);

  const adjustAllHeights = useCallback(() => {
    requestAnimationFrame(() => {
      adjustHeight(titleRef.current);
      adjustHeight(descriptionRef.current);
      adjustHeight(commentRef.current);
    });
  }, [adjustHeight]);

  useEffect(() => {
    if (task) {
      setOriginalTask({ ...task });
      setTitle(task.title || "");
      setDescription(task.description || "");
      setComment(task.comment || "");
    }
  }, [task?.id]);

  useEffect(() => {
    if (!task) return;
    adjustAllHeights();

    const timeoutId = setTimeout(adjustAllHeights, 50);
    const secondaryTimeout = setTimeout(adjustAllHeights, 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(secondaryTimeout);
    };
  }, [task?.id, title, description, comment, adjustAllHeights]);

  const handleInputChange = (setter, ref) => (e) => {
    setter(e.target.value);
    adjustHeight(ref.current);
  };

  const handleResetTask = () => {
    if (originalTask) {
      setTitle(originalTask.title || "");
      setDescription(originalTask.description || "");
      setComment(originalTask.comment || "");
      setTimeout(adjustAllHeights, 0);
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
    titleRef,
    descriptionRef,
    commentRef,
    handleResetTask,
    title,
    setTitle,
    description,
    setDescription,
    comment,
    setComment,
    handleInputChange,
    adjustAllHeights,
  };
};
