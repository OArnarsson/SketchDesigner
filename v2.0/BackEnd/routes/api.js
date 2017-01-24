global.rootRequire = (name) => {
    return require('../../FrontEnd/node_modules' + '/' + name);
}

const express = rootRequire('express');
const router = express.Router();
const _ = rootRequire("lodash");
const mongoose = rootRequire('mongoose');
const Rx = rootRequire('RxJS')
const Workspace = require('../models/workspace');
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
router.route('/workspace')
    .post((req, res) => {
        let workspace = new Workspace();
        workspace.title = req.body['title'];
        workspace.dateCreated = req.body['dateCreated'];
        workspace.dateModified = req.body['dateModified'];
        workspace.canvasArr = req.body['canvasArr'];

        workspace.save((err) => {
            if (err)
                res.status(500).send(err);
            res.json({ log: 'Workspace created!' });
        });
    })

    .get((req, res) => {
        Workspace.find((err, workspace) => {
            if (err)
                res.status(500).send(err);

            res.json(workspace);
        }).sort({ dateModified: 'desc' });
    });


// Designs/ID routes
router.route('/designs/:dateCreated')
    .get((req, res) => {
        Design.findOne({ dateCreated: req.params.dateCreated }, (err, workspace) => {
            if (err)
                res.status(500).send(err);

            res.json(workspace);
        });
    })

    .put((req, res) => {
        Workspace.findOne({ dateCreated: req.body['dateCreated'] }, (err, workspace) => {
            if (err)
                res.status(500).send(err);
            workspace.title = req.body['title'];
            workspace.dateCreated = req.body['dateCreated'];
            workspace.dateModified = req.body['dateModified'];
            workspace.canvasArr = req.body['canvasArr'];
            workspace.save(function (err) {
                if (err)
                    res.status(500).send(err);
                res.json({ message: 'Workspace saved!' });
            });
        });
    })

    .delete(function (req, res) {
        Workspace.findOneAndRemove({ dateCreated: req.params.dateCreated }, (err, workspace) => {
            if (err)
                res.status(500).send(err);
            console.log(design);

            res.json({ message: 'Workspace deleted!' });
        });
    });

module.exports = router;