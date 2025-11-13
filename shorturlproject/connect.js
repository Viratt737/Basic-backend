const mongoose = require("mongoose");
async function connectToMongooseDB(url) {
    return mongoose.connect(url);
    
}
module.exports ={
    connectToMongooseDB,
}