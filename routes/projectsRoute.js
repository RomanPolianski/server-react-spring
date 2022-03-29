import express from 'express';
const router = express.Router();
import projectsInfo from '../projects.js';

router.get('/', (req, res) => {
  try {
    const textRequest = req.query.value;
    if (textRequest) {
      const filtedProjects = {
        projects: projectsInfo.projects.filter(
          (project) =>
            project.title.toLowerCase().includes(textRequest.toLowerCase()) ||
            project.text.toLowerCase().includes(textRequest.toLowerCase())
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
