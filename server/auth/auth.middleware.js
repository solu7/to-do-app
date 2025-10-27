import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export default verifyToken;
