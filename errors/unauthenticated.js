const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// UnauthenticatedError class'ımızı BadRequestError classımıza iplemente ediyoruz. BadRequestError classımız örneği alındığında constructor'a gönderilen parametreyi UnauthenticatedError'ın constructor'ına gönderiyoruz. Aynı zaöamda statusCode özelliğini oluşturup StatusCodes'dan geşen UNAUTHORIZED özelliğini atıyoruz.
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
