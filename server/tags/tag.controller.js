import {
  createTag as _createTag,
  deleteTag as _deleteTag,
  assignTagToTask as _assignTagToTask,
  removeTagFromTask as _removeTagFromTask,
  getTagsInTask as _getTagsInTask,
  getTagsByUserId as _getTagsByUserId,
} from "./tag.model.js";

export const createTag = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "The tag name is required" });
  }

  try {
    const tag = await _createTag(userId, name.trim());
    res.status(201).json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTag = async (req, res) => {
  const userId = req.user.id;
  const { tagId } = req.params;

  try {
    await _deleteTag(userId, tagId);
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getTagsByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const tags = await _getTagsByUserId(userId);
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error al obtener los tags:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getTagsInTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;

  try {
    const tagsInTask = await _getTagsInTask(userId, taskId);
    res.status(200).json(tagsInTask);
  } catch (error) {
    console.error("Error al obtener los tags:", error);
    res.status(500).json({ message: "Error del servidor" });
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
  const { taskId } = req.params;
  const { tagId } = req.body;

  try {
    await _removeTagFromTask(userId, taskId, tagId);
    res.status(200).json({ message: "Tag successfully removed from task" });
  } catch (error) {
    console.error("Error deleting task tag:", error);
    res.status(400).json({ message: error.message });
  }
};
