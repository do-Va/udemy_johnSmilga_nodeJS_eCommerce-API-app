const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

// NotFoundError class'ımızı CustomAPIError classımıza iplemente ediyoruz. NotFoundError classımız örneği alındığında constructor'a gönderilen parametreyi CustomAPIError'ın constructor'ına gönderiyoruz. Aynı zaöamda statusCode özelliğini oluşturup StatusCodes'dan geşen NOT_FOUND özelliğini atıyoruz.
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
