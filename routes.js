const express = require('express');
const router = express.Router();
const projectsController = require('./controller/projects-controller');
const userController = require('./controller/user-controller');
const checkToken = require('./middleware/checkToken');
const registrationValidator = require('./middleware/registrationValidator');

router.get('/projects' , checkToken ,projectsController.getProjects);
router.get('/projects/:title', checkToken, projectsController.getSearchProjects);
router.post('/login', userController.login);
router.post(
  '/registration',
  registrationValidator,
  userController.registration
);
router.post('/refresh-token', userController.refreshToken);
router.delete('/refresh-token', userController.deleteRefreshToken);

module.exports = router;
