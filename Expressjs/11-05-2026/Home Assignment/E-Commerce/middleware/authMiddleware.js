const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access token expired. Please refresh.",
        });
      }

      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    User.findById(decoded.id)
      .select("-password -refreshToken")
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "User not found",
          });
        }

        req.user = user;

        next();
      })
      .catch(() => {
        res.status(500).json({
          message: "Authentication failed",
        });
      });
  });
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};