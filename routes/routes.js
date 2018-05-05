const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Candidate = require('../models/candidates');
const Tablecolumns = require('../models/tablecolumns');

router.get('/candidateList', (req, res, next) => {
    Candidate.find((err, candidates) => {
        console.log(candidates);
        res.json(candidates);
    })
});

router.post('/candidateList', (req, res, next) => {
    let newCandidate = new Candidate({
        name: req.body.name,
        experience: req.body.experience,
        jobLocation: req.body.jobLocation,
        joinDate: req.body.joinDate,
        skills: {
            java: req.body.skills.java,
            python: req.body.skills.python,
            html: req.body.skills.html,
            css: req.body.skills.css,
            javascript: req.body.skills.javascript
        },
        gender: req.body.gender
    });

    newCandidate.save((err, contact) => {
        if (err) {
            res.json({
                msg: 'failed to add contact'
            });
        } else {
            res.json({
                msg: 'Contact added succesfully'
            });
        }
    })
});


router.get('/tableColumns', (req, res, next) => {
    Tablecolumns.find((err, columns) => {
        res.json(columns);
    })
});

router.put('/tableColumns', (req, res) => {
    console.log(req.body);
    const id = req.body._id;
    const details = {
        '_id': mongoose.Types.ObjectId(id)
    };
    const note = {
        name: req.body.name,
        experience: req.body.experience,
        jobLocation: req.body.jobLocation,
        joinDate: req.body.joinDate,
        skills: req.body.skills,
        gender: req.body.gender
    };
    Tablecolumns.update(details, note, (err, result) => {
        if (err) {
            res.send({
                'error': 'An error has occurred'
            });
        } else {
            res.send(note);
        }
    });
});


module.exports = router;