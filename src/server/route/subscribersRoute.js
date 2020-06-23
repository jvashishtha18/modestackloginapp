const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controller/subscriberController');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
router.post('/subscribers', user_controller.user_create);

router.post('/checkusername', user_controller.check_username);
router.get('/subscribers', user_controller.user_alldetails);
router.put('/subscribers/:id', user_controller.user_update);
router.delete('/subscribers/:id', user_controller.user_delete);
// login parts starts from here
router.post('/login/user', user_controller.user_login);
module.exports = router;