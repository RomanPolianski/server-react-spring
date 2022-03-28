import express from 'express';
import projectsInfo from './projects.js';
import cors from 'cors';

const PORT = process.env.PORT ?? 3001;
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/projects', (req, res) => {
  try {
    if (req.query.value) {
      const filtedProjects = projectsInfo.projects.filter((project) => (
        project.title.toLowerCase().includes(req.query.value)
          || project.text.toLowerCase().includes(req.query.value)
      ));
      res.send(filtedProjects);
    } else {
      res.send(projectsInfo);
    }
  } catch {
    res.status(500).send(req.query);
  }
});

app.post('/login', (req, res) => {
  const user = {
    username: 'admin',
    password: '1234',
  };

  try {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      res.status(200).send({status: 'Success'});
    } else {
      res.status(401).send({status: 'Invalid username or password'});
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
