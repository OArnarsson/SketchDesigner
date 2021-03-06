global.rootRequire = (name) => {
    return require('../../FrontEnd/node_modules' + '/' + name);
}

const express = rootRequire('express');
const router = express.Router();
const _ = rootRequire("lodash");
const mongoose = rootRequire('mongoose');
const Rx = rootRequire('RxJS')
const Design = require('../models/designs');
let uri = 'mongodb://Onri:PeppTaco@ds149577.mlab.com:49577/sketchdesigner'
mongoDB = mongoose.connect(uri);


router.use(function (req, res, next) {
    let d = new Date();
    timeStamp = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log(timeStamp + ' - ' + req.method + ' request - URL: "' + req.originalUrl + '"');
    next();
});

router.get('/', (req, res) => {
    res.send('API is live!');
});


// Designs routes
router.route('/designs')
    .post((req, res) => {
        let design = new Design();
        design.title = req.body['title'];
        design.dateCreated = req.body['dateCreated'];
        design.dateModified = req.body['dateModified'];
        design.canvasArr = req.body['canvasArr'];

        design.save((err) => {
            if (err)
                res.status(500).send(err);
            res.json({ log: 'Design created!' });
        });
    })

    .get((req, res) => {
        Design.find((err, designs) => {
            if (err)
                res.status(500).send(err);

            res.json(designs);
        }).sort({ dateModified: 'desc' });
    });


// Designs/ID routes
router.route('/designs/:dateCreated')
    .get((req, res) => {
        Design.findOne({ dateCreated: req.params.dateCreated }, (err, design) => {
            if (err)
                res.status(500).send(err);

            res.json(design);
        });
    })

    .put((req, res) => {
        Design.findOne({ dateCreated: req.body['dateCreated'] }, (err, design) => {
            if (err)
                res.status(500).send(err);
            design.title = req.body['title'];
            design.dateCreated = req.body['dateCreated'];
            design.dateModified = req.body['dateModified'];
            design.canvasArr = req.body['canvasArr'];
            design.save(function (err) {
                if (err)
                    res.status(500).send(err);
                res.json({ message: 'Design saved!' });
            });
        });
    })

    .delete(function (req, res) {
        Design.findOneAndRemove({ dateCreated: req.params.dateCreated }, (err, design) => {
            if (err)
                res.status(500).send(err);
            console.log(design);

            res.json({ message: 'Design deleted!' });
        });
    });

module.exports = router;