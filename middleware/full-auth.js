const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  // token değişkeni oluşturuyoruz.
  let token;

  // istek geldiğinde req.headers.authorization değerini authHeader değişkenine atıyoruz.
  const authHeader = req.headers.authorization;

  // Eğer authHeader içerisinde değer varsa ve gelen değer 'Bearer' ile başlıyorsa, authHeader içerisindeki değeri boşluk ile ayırarak 2.ci değeri token içerisine atıyoruz.
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  // Eğer istek içerisinde bulunan cookies içerisinde token diye bir key ve onun değeri varsa token değerine ata.
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // token yok ise UnauthenticatedError hatası gönder.
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }

  try {
    // isTokenValid metodundan dönen değeri payload içerisine atıyoruz.
    const payload = isTokenValid(token);

    // sonrasında res.user keyimizin userId ve role değerlerine payloadın değerlerini veriyoruz.
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    // Eğer hata varsa UnauthenticatedError hatası gönderiyoruz.
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
