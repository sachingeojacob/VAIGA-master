const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Department'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


const positionSchema = mongoose.model('Position', PositionSchema);

module.exports = {
    Position: positionSchema,
}