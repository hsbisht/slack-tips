const express = require('express');
const { interactionHandler, learnSlashCommandHandler} = require('../controllers/slackController');

const router = express.Router();

router.post('/learn', learnSlashCommandHandler);
router.post('/interactions', interactionHandler);

module.exports = router;