const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

function validateQueryParams(data) {
  const errors = [];
  let { page, size } = data;

  if (parseInt(page) < 1 || parseInt(page) > 10 ) errors.push(["page", "Page must be greater than or equal to 1"]);
  if (parseInt(size) < 1 || parseInt(size) > 20) errors.push(["size", "Size must be greater than or equal to 1"]);

  return errors;
}

function validateNewStory(data) {
  const errors = [];
  if (!data.title) errors.push(["title", "Title is required"]);
  if (!data.body) errors.push(["body", "Body is required"]);
  return errors;
}

module.exports = {
  handleValidationErrors, validateQueryParams, validateNewStory
};
