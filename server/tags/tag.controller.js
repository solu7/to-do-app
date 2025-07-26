import { createTag as _createTag, assignTagToTask as _assignTagToTask, removeTagFromTask as _removeTagFromTask } from "./tag.model.js";

export const createTag = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "The tag name is required" });
  }

  try {
    const tag = await _createTag(userId, name.trim());
    res.status(201).json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const assignTagToTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;
  const { tagId } = req.body;

  if (!tagId) {
    return res.status(400).json({ message: "The tag ID is required" });
  }

  try {
    await _assignTagToTask(userId, taskId, tagId);
    res.status(200).json({ message: "Tag assigned correctly to the task" });
  } catch (error) {
    console.error("Error assigning tag to task:", error);
    res.status(400).json({ message: error.message });
  }
};

export const removeTagFromTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId, tagId } = req.params;

  try {
    await _removeTagFromTask(userId, taskId, tagId);
    res
      .status(200)
      .json({ message: "Tag successfully removed from task" });
  } catch (error) {
    console.error("Error deleting task tag:", error);
    res.status(400).json({ message: error.message });
  }
};
