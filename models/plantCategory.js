const mongoose = require('mongoose');

const PlantCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
});


const plantCategorySchema = mongoose.model('PlantCategory', PlantCategorySchema);

module.exports = {
    PlantCategory: plantCategorySchema,
}