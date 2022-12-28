const express = require('express');
const app = express();
const port = 3000;

console.log(__dirname);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));

app.get('/', (req, res) => {
    res.sendFile('interface.html', {root: `${__dirname}`});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})