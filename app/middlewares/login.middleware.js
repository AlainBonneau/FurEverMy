import errorHandler from "./errorHandler.middleware.js";

function isLoggedIn(req, res, next) {
  if (req.userId && req.userRole) {
    next();
  } else {
    res.status(401).json({ message: "Vous devez vous connecter" });
  }
}

function isEmployee(req, res, next) {
  if (req.userId && (req.userRole === "Employé" || req.userRole === "Admin")) {
    next();
  } else {
    errorHandler._404();
  }
}

function isAdmin(req, res, next) {
  if (req.userId && req.userRole === "Admin") {
    next();
  } else {
    errorHandler._404();
  }
}

export { isLoggedIn, isEmployee, isAdmin };
