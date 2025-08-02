import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import {
  findUserByUsername,
  findUserByEmail,
  createUser,
} from "../users/user.model.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername.length > 0) {
      return res
        .status(409)
        .json({ message: "Ya hay un usuario con ese Username" });
    }

    const hashedPassword = await hash(password, 10);
    await createUser(username, email, hashedPassword);

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y password son obligatorios" });
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
    res.status(500).json({ message: "Error en el servidor" });
  }
}
