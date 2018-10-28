const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objetoSchema = Schema({
    _id: String,
    image:String,
    title: String,
    description:String,
    precio:Number,
    isDone: Boolean,
    n:Number
});

module.exports = mongoose.model('taskcs',objetoSchema);

