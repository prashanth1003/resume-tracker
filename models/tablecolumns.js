const mongoose = require('mongoose');

const TablecolumnsSchema = mongoose.Schema({
    name: Boolean,
    experience: Boolean,
    jobLocation: Boolean,
    joinDate: Boolean,
    skills: Boolean,
    gender: Boolean
});

const Tablecolumns = module.exports = mongoose.model('Tablecolumns', TablecolumnsSchema);