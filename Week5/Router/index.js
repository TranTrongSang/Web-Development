const express = require('express');
const app = express();
const port = 3000;
const exampleRoute = require('./routes/example');

app.use('/example', exampleRoute);


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js app!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});