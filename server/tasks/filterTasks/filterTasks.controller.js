import { getFilteredTasks } from "./filterTasks.model.js";

export const filterTasks = async (req, res) => {
  const userId = req.user.id;
  const { tags = [], categories = [] } = req.body;

  try {
    const tasks = await getFilteredTasks(userId, tags, categories);
    res.json(tasks);
  } catch (error) {
    console.error("Error filtering tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};