import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
import { findUserById } from "../users/user.model.js";

export async function authenticateUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.tokenExp = decoded.exp;

    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}

export function verifyOnlyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}
