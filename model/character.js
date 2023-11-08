const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
})

const character = mongoose.model('character', userSchema);

module.exports = character;