const response = (res, data, status = 200, message = "Success") => {
    res.status(status).json({
      status: status,
      message: message,
      data: data
    });
  };
  
  module.exports = response;
  