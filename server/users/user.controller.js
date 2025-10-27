import { getUsernameByUserId as __getUsernameByUserId } from "./user.model.js";

export const getUsernameByUserId = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ message: "The user id is required" });
  }
  try {
    const username = await __getUsernameByUserId(userId);
    console.log("username", username);
    res.json({ username: username });
  } catch (error) {
    console.error("User not found", error);
    res.status(400).json({ message: error.message });
  }
};
