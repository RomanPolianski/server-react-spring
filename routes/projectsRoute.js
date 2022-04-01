const express = require('express');
const projectsController = require('../controller/projects.controller');
const router = express.Router();

router.get('/', projectsController.getProjects);
router.get('/:title', projectsController.getSearchProjects);

module.exports = router;

