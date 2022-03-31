const express = require('express');
const cors = require('cors');
const projects = require('./routes/projectsRoute.js'); 
const login = require('./routes/loginRoute.js'); 

const PORT = process.env.PORT ?? 3001;
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/projects', projects);
app.use('/login', login);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
