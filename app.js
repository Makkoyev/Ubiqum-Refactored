const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');

const app = express();

//Middlewhare

app.use(bodyParser.json());
app.use(cors());
app.use('/assets', express.static('assets'));

// Route the Index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});
// Route the Senate-Data.html
app.get('/senate-data', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/senate-data.html'));
});
// Route the House-Data.html
app.get('/house-data', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/house-data.html'));
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}!`));