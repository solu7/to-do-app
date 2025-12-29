import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import {
  findUserByUsername,
  findUserByEmail,
  findUserById,
  createUser,
  createGuestUser,
} from "../users/user.model.js";

import { initializeUserData } from "../tasks/task.model.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "The email is already registered" });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername.length > 0) {
      return res
        .status(409)
        .json({ message: "Ya hay un usuario con ese Username" });
    }

    const hashedPassword = await hash(password, 10);
    const userId = await createUser(username, email, hashedPassword);
    await initializeUserData(userId);

    res.status(201).json({ message: "Successfully registered user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const users = await findUserByEmail(email);
    if (users.length === 0) {
      console.log("error finduserbyemail");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = users[0];
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.log("error passwordmatch");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200000,
    });

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function loginAsGuest(req, res) {
  try {
    const userId = await createGuestUser();
    await initializeUserData(userId);
    const user = await findUserById(userId);

    const token = sign(
      { id: userId, isGuest: user.is_guest, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    const maxAgeMs = 7200000;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: maxAgeMs,
    });

    res.status(200).json({
      message: "Inicio de sesión como invitado exitoso.",
    });
  } catch (error) {
    console.error("Error al iniciar sesión como invitado:", error);
    res
      .status(500)
      .json({ message: "Server error al crear sesión de invitado" });
  }
}

export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
}
