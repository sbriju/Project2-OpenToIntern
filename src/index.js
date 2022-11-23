const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/router');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://yashrajsinh09:yashraj2727@assignment.lhpfmud.mongodb.net/yes', {
    useNewUrlParser: true
}).then(() => console.log('MongoDb is connected.'))
    .catch(err => console.log(err));

app.use('/', route);

app.use((req, res) => res.status(400).send({ status: false, message: 'Invalid URL' }));
app.listen(3000, () => console.log('Express app is running on port 3000.'));
