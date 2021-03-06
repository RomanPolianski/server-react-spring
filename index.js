require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes')

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'https://romanpolianski.github.io' }));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
