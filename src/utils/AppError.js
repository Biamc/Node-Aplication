class AppError {
  message
  statusCode

  constructor(message, statusCode = 400) {
    //statusCode = 400, se o statusCode não for mencionado, deve-se considerar o código 400
    this.message = message
    this.statusCode = statusCode
  }

}

module.exports = AppError