import errorHandler from "./errorHandler.middleware.js";

function isLoggedIn(req, res, next) {
  if (req.userId && req.userRole) {
    next();
  } else {
    errorHandler._401(["Vous devez vous connecter"], req, res);
  }
}

function isEmployee(req, res, next) {
  if (req.userId && (req.userRole === "Employé" || req.userRole === "Admin")) {
    next();
  } else {
    errorHandler._403(["Accès employé ou admin requis"], req, res);
  }
}

function isAdmin(req, res, next) {
  if (req.userId && req.userRole === "Admin") {
    next();
  } else {
    errorHandler._403(["Accès admin requis"], req, res);
  }
}

export { isLoggedIn, isEmployee, isAdmin };
