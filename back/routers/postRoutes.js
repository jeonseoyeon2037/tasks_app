const router = require('express').Router();
const { postTask } = require('../controllers/postTask');

// :userId는 정해지지 않은 문자열이며 params로 받는다.
router.post('/post_task', postTask);

module.exports = router;
