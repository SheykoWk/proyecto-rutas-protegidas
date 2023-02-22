const success = ({ status, data, message, res }) => {
  res.status(status).json({
    error: false,
    status: status,
    message: message,
    data: data,
  });
};

const error = ({ status, message, res, fields }) => {
  res.status(status).json({
    error: true,
    status: status,
    message: message,
    fields: fields,
  });
};

module.exports = {
  success,
  error,
};
