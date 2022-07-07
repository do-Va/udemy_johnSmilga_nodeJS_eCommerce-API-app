const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// CustomAPIError class'ımızı BadRequestError classımıza iplemente ediyoruz. BadRequestError classımız örneği alındığında constructor'a gönderilen parametreyi CustomAPIError'ın constructor'ına gönderiyoruz. Aynı zaöamda statusCode özelliğini oluşturup StatusCodes'dan geşen BAD_REUEST özelliğini atıyoruz.
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
