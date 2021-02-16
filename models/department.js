const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


const departmentSchema = mongoose.model('Department', DepartmentSchema);

module.exports = {
    Department: departmentSchema,
}