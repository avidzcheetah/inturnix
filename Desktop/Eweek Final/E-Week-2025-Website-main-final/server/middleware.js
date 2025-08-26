import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.body.token?.replace(/"/g, "").trim();
 // read from body

 
  if (!token) {
    
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "mysecretkey");
    req.user = decoded; // attach payload
    next();             // token valid → allow access
  } catch (err) {
    
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
