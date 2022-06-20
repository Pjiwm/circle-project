const logger = require("tracer").console();

const errorHandlerMiddleware = async (err, req, res) => {
  logger.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
