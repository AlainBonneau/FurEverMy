import errorHandler from "./errorHandler.middleware.js";

export const controllerWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    errorHandler._500(error, req, res);
  }
};
