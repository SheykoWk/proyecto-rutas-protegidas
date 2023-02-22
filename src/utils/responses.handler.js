const success = ({ status, data, message, res }) => {
  res.status(status).json({
    error: false,
    status: status,
    message: message,
    data: data,
  });
};

const error = ({ status, err, message, res, fields }) => {
  res.status(status).json({
    error: true,
    status: status,
    message: message,
    fields: fields,
    data: err,
  });
};

module.exports = {
  success,
  error,
};
