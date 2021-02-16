const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PlantCategory'
    },
    remedies: {
        type: String,
        required: true
    },
    youtubelinks: {
        type: String
    }
});


const diseaseSchema = mongoose.model('Disease', DiseaseSchema);

module.exports = {
    Disease: diseaseSchema,
}