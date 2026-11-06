import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    // 1. Get the authorization header
    const authHeader = req.headers.authorization;

    // 2. Check whether the token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // 3. Extract the token
    const token = authHeader.split(" ")[1];

    // 4. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user information to the request
    req.user = {
      userId: decoded.userId,
    };

    // 6. Allow the request to continue
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
