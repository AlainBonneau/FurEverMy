const errorHandler = {
  _400: (errors, req, res) => {
    res.status(400).json({
      type: "Bad request",
      errors,
    });
  },

  _401: (errors, req, res) => {
    res.status(401).json({
      type: "Unauthorized",
      errors,
    });
  },

  _403: (errors, req, res) => {
    res.status(403).json({
      type: "Forbidden",
      errors,
    });
  },

  _404: (Model, req, res) => {
    const error = Model?.name
      ? `${Model.name} not found. Please verify the provided ID.`
      : "Resource not found.";

    res.status(404).json({
      type: "Not found",
      error,
    });
  },

  _500: (error, req, res) => {
    const response = res ?? req;

    console.trace(error);

    if (!response || typeof response.status !== "function") {
      return;
    }

    response.status(500).json({
      type: "Internal Server Error",
      error: error.toString(),
    });
  },
};

export default errorHandler;
