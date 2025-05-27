const router = require('express').Router();
const { getTasks } = require('../controllers/getTasks');

// :userId는 정해지지 않은 문자열이며 params로 받는다.
router.get('/get_task/:userId', getTasks);

module.exports = router;
