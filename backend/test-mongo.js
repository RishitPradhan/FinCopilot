const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fincopilot')
    .then(() => {
        console.log('Connected');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
