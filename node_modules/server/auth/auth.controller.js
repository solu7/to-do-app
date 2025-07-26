import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
import { findUserByUsername, findUserByEmail, createUser } from "../users/user.model.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "All fields are required." });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "The email is already registered" });
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername.length > 0) {
      return res.status(409).json({ message: "There is already a user with that username." });
    }

    const hashedPassword = await hash(password, 10);
    await createUser(username, email, hashedPassword);

    res.status(201).json({ message: "Successfully registered user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  try {
    const users = await findUserByEmail(email);
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Successful logged in", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

