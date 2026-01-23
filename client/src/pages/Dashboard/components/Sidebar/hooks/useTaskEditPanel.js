import { useState, useEffect } from "react";
import useAutoGrowTextArea from "../../../../../core/hooks/useAutoGrowTextarea";

export const useTaskEditPanel = (task) => {
  const [taskEditPanelIsOpen, setTaskEditPanelIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [originalTask, setOriginalTask] = useState(null);

  const titleGrow = useAutoGrowTextArea(title);
  const descGrow = useAutoGrowTextArea(description);
  const commentGrow = useAutoGrowTextArea(comment);

  useEffect(() => {
    if (task) {
      setOriginalTask({ ...task });
      setTitle(task.title || "");
      setDescription(task.description || "");
      setComment(task.comment || "");
    }
  }, [task]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleResetTask = () => {
    if (originalTask) {
      setTitle(originalTask.title || "");
      setDescription(originalTask.description || "");
      setComment(originalTask.comment || "");
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
    titleRef: titleGrow.textareaRef,
    descriptionRef: descGrow.textareaRef,
    commentRef: commentGrow.textareaRef,
    handleResetTask,
    title,
    setTitle,
    description,
    setDescription,
    comment,
    setComment,
    handleInputChange,
  };
};
