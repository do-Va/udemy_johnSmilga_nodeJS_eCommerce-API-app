const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  // customError adında bir obje oluşturuyoruz.
  let customError = {
    // statusCode özelliği oluşturup içerisine eğer err parametresinden gelen statusCode değeri varsa onu yoksa StatusCodes paketinden gelen INTERNAL_SERVER_ERROR özelliğini ata.
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    // msg özelliği oluşturup içerisine eğer err parametresinden gelen msg değeri varsa onu yoksa kendi oluşturduğumuz metni ata.
    msg: err.message || 'Something went wrong try again later',
  };

  // eğer err parametresinin name özelliğinin değeri ValidationError ise,
  if (err.name === 'ValidationError') {
    // err içerisindeki errors özelliğinin değerlerini al ve map döngüsü ile içerisindeki her bir objenin message özelliğini birleştir ve customError'un msg özelliğine ata. Son olarak da customError'un statusCode özelliğine 400 kodunu ver.
    customError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(',');
    customError.statusCode = 400;
  }

  // eğer err parametresinin code özelliği varsa ve özelliğinin değeri 11000 ise,
  if (err.code && err.code === 11000) {
    // err parametresinin keyValue değerindeki keyleri alıp metinle birleştirdikten sonra customError'un msg özelliğine atıyoruz. Son olarak da customError'un statusCode özelliğine 400 kodunu ver.
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  // eğer err parametresinin name özelliğinin değeri CastError ise,
  if (err.name === 'CastError') {
    // err parametresinin value değerini alıp metinle birleştirip customError'un msg özelliğine atıyoruz. Son olarak da customError'un statusCode özelliğine 404 kodunu ver.
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // En son metot cevabı olarak customError.statusCode ve customError.msg  değerlerini geri gönderiyoruz.
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
