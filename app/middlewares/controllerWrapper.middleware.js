import errorHandler from "./errorHandler.middleware.js";

export const controllerWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    if (error?.isJoi || error?.statusCode === 400) {
      return errorHandler._400(
        error.details?.map((detail) => detail.message) || [error.message],
        req,
        res
      );
    }
    errorHandler._500(error, req, res);
  }
};
