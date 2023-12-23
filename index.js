// connect to the database
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb+srv://sathishdatascientist:Guvi2023@cluster0.2r9mjwk.mongodb.net/imageDB')
    .then(() => {
        console.log('Connected to MongoDB...');
        const port = 3001;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));