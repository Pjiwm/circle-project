class EntityNotFoundError extends Error {
  /**
   * @description Sets message in constructor
   *
   */
  constructor(message) {
    super(message);
    this.name = "EntityNotFoundError";
  }
}
/**
 * @description Checks if error passes correct validation in controller
 *
 * @param err  - a 400 error with a message of what went wrong during validation
 */
function validation(err, req, res, next) {
  console.log(err.name);
  if (err.name === "ValidationError") {
    res.status(400).json({
      message: err.message,
    });
  } else {
    next(err);
  }
}
/**
 * @description Checks if parameter id does not exist on resource
 *
 * @param err - a 400 error with an invalid id message
 */
function cast(err, req, res, next) {
  if (err.name === "CastError") {
    res.status(400).json({
      message: `Invalid resource id: ${err.value}`,
      // message: err
    });
  } else {
    next(err);
  }
}
/**
 * @description Checks if request is not found and gives an error
 *
 * @param err - 404 error
 */
function entityNotFound(err, req, res, next) {
  if (err.name === "EntityNotFoundError") {
    res.status(404).json({
      message: err.message,
    });
  } else {
    next(err);
  }
}

export = {
  EntityNotFoundError,
  handlers: [validation, cast, entityNotFound],
};
