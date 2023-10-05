const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is Required"],
        maxlength: [25, "Maximum length of name is 25"]
    }
});

module.exports = mongoose.model("Task", taskSchema);