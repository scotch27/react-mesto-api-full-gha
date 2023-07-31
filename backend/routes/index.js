const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../utils/errors/notFoundError');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth);

router.use('/', users);
router.use('/', cards);
router.use('*', () => {
  console.log('any adsress');
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
