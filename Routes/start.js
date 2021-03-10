const auth = require('../Controller/auth.js')
const startControllers = require('../Controller/start.js')

const router = express.Router();

router.get('/', startControllers.getLogin )

router.get('/login', startControllers.getLogin)

router.post('/login', startControllers.postLogin)

router.get('/sign-up', startControllers.getSignup)

router.post('/sign-up', startControllers.postSignup)

router.get('/logout',auth,startControllers.getLogout)

module.exports = router;