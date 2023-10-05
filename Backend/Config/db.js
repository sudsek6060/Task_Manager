const mongoose = require("mongoose")

const connectToDb = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((conn) => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    })
};

module.exports = connectToDb;