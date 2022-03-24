import express from 'express';

const PORT = process.env.PORT ?? 3001;
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello!!!</h1>')
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
});