const mongoose = require('mongoose');

const ScannedSchema = new mongoose.Schema({
    diseasename: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    month: {
        type: Number
    },
    day: {
        type: Number
    },
    year: {
        type: Number
    },
    lati: {
        type: String,
        required: true
    },
    logi: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    deviceid: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PlantCategory'
    }
});


const scannedSchema = mongoose.model('Scanned', ScannedSchema);

module.exports = {
    Scanned: scannedSchema,
}