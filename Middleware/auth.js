// middlewares/auth.js
import jwt from "jsonwebtoken";

const publicRoutes = [
  { path: "/login", method: "POST" },
  { path: "/register", method: "POST" },
  { path: "/products", method: "GET" },
  { path: "/auth/google", method: "GET" },
  { path: "/auth/google/callback", method: "GET" },
];

export const authMiddleware = (req, res, next) => {
  // Check if current route is public
  const isPublic = publicRoutes.some(
    route =>
      req.path.startsWith(route.path) && req.method === route.method
  );

  if (isPublic) {
    return next(); // Skip auth
  }

  // Otherwise require JWT
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};
