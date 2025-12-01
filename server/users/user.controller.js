import {
  findUserById,
  updateUsername as __updateUsername,
  findUserPasswordById,
  updatePassword as __updatePassword,
} from "./user.model.js";
import { compare } from "bcrypt";

export const getUserData = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUsername = async (req, res) => {
  const userId = req.user.id;
  const { newUsername } = req.body;

  if (!newUsername || newUsername.trim() === "") {
    return res.status(400).json({ message: "The new username is required." });
  }

  try {
    const currentUserData = await findUserById(userId);
    if (!currentUserData) {
      return res.status(404).json({ message: "User not found." });
    }
    const currentUsername = currentUserData.username;

    if (newUsername.trim() === currentUsername) {
      return res.status(400).json({
        message:
          "El nuevo nombre de usuario debe ser diferente al que ya tienes.",
      });
    }

    const updated = await __updateUsername(userId, newUsername.trim());

    if (updated) {
      res.status(200).json({
        message: "El nombre de usuario se cambio correctamente.",
        username: newUsername.trim(),
      });
    } else {
      res.status(500).json({ message: "Error al actualizar el username." });
    }
  } catch (error) {
    console.error("Error al actualizar el username:", error);
    res.status(500).json({ message: "Error interno en el servidor." });
  }
};

export const updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "La contraseña actual y la nueva son requeridas." });
  }

  try {
    const user = await findUserPasswordById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "La contraseña actual es incorrecta." });
    }

    if (await compare(newPassword, user.password)) {
      return res.status(400).json({
        message: "La nueva contraseña debe ser diferente a la que ya tienes.",
      });
    }

    const updated = await __updatePassword(userId, newPassword);

    if (updated) {
      res.status(200).json({
        message: "La contraseña se actualizó correctamente.",
      });
    } else {
      res.status(500).json({ message: "Error al actualizar la contraseña." });
    }
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ message: "Error interno en el servidor." });
  }
};
