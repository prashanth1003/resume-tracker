const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    name: String,
    experience: String,
    jobLocation: String,
    joinDate: String,
    skills: {
        java: Boolean,
        python: Boolean,
        html: Boolean,
        css: Boolean,
        javascript: Boolean
    },
    gender: String
});

const Candidate = module.exports = mongoose.model('Candidate', CandidateSchema);