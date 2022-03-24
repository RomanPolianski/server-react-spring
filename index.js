import express from 'express';
import projectsInfo from './projects.js';

const PORT = process.env.PORT ?? 3001;
const app = express();

app.get('/projects', (req, res) => {
  try {
    res.send(projectsInfo);
  } catch {
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
