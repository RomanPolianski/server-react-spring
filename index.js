import express from 'express';
import projectsInfo from './projects.js';
import cors from 'cors';

const PORT = process.env.PORT ?? 3001;
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/projects', (req, res) => {
  try {
    res.send(projectsInfo);
  } catch {
    res.status(500).send();
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
      res.status(200).send('Success');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
