const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, this is an example route!');
});

router.post('/', (req, res) => {
    const data = req.body;
    res.json(`You sended: ${JSON.stringify(data)}`);
});


router.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`You searched for: ${q}`);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`You requested data for ID: ${id}`);
});



module.exports = router;