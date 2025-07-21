import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import { findUserByEmail, createUser } from "../users/user.model.js";

export async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y password son obligatorios" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await hash(password, 10);
    await createUser(email, hashedPassword);

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
      console.log("error finduserbyemail")
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = users[0];
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.log("error passwordmatch")
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

