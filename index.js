import express from 'express';

const PORT = process.env.PORT ?? 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
});