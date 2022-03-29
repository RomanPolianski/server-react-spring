import express from 'express';
const router = express.Router();
import projectsInfo from '../projects.js';

router.get('/', (req, res) => {
  try {
    if (req.query.value) {
      const filtedProjects = {
        projects: projectsInfo.projects.filter(
          (project) =>
            project.title.toLowerCase().includes(req.query.value) ||
            project.text.toLowerCase().includes(req.query.value)
        ),
      };
      res.send(filtedProjects);
    } else {
      res.send(projectsInfo);
    }
  } catch {
    res.status(500).send('Server error');
  }
});

export default router;
