const mongoose      = require('mongoose');
const config        = require('config');
const {mongo_uri}   = config.get('services.database');


mongoose.connect(mongo_uri, {
    useUnifiedTopology : true,
    useNewUrlParser    : true,
})
.then((db) => {
        console.log('Database is connected');
    }).catch((err) => {
        console.log(err);
    });

