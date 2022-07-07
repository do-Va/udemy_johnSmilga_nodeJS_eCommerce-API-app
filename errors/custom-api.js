// Error interface'ini CustomAPIERROR classımıza iplemente ediyoruz. CustopAPIError classımız örneği alındığında constructor'a gönderilen parametreyi Error'ın constructor'ına gönderiyoruz.
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;
