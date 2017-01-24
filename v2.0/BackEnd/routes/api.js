global.rootRequire = (name) => {
    return require('../../FrontEnd/node_modules' + '/' + name);
}

const express = rootRequire('express');
const router = express.Router();
const _ = rootRequire("lodash");
const mongoose = rootRequire('mongoose');
const Rx = rootRequire('RxJS')
const Workspace = require('../models/workspace');
const utility = require('../utility/utility');
let uri = 'mongodb://Onri:PeppTaco@ds149577.mlab.com:49577/sketchdesigner'
mongoDB = mongoose.connect(uri);


router.use(function (req, res, next) {
    console.log(utility.shortDate(req));
    next();
});

router.get('/', (req, res) => {
    res.send('API is live!');
});


// Designs routes
router.route('/workspace')
    .post((req, res) => {
        let workspace = new Workspace();
        for (let prop in req.body)
            workspace[prop] = req.body[prop];

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
router.route('/workspace/:dateCreated')
    .get((req, res) => {
        if (req.params.dateCreated != 'new')
            Workspace.findOne({ dateCreated: req.params.dateCreated }, (err, workspace) => {
                if (err)
                    res.status(500).send(err);

                res.json(workspace);
            });
        else {
            let workspace = new Workspace();
            for (let prop in utility.newspace)
                workspace[prop] = utility.newspace[prop];
            workspace.dateCreated = utility.longDate();
            workspace.dateModified = workspace.dateCreated;
            workspace.save((err) => {
            if (err)
                res.status(500).send(err);
            res.json(workspace);
        });
        }
    })

    .put((req, res) => {
        Workspace.findOne({ dateCreated: req.body['dateCreated'] }, (err, workspace) => {
            if (err)
                res.status(500).send(err);
            for (let prop in req.body) 
                workspace[prop] = req.body[prop];
            workspace.dateModified = utility.longDate();
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
            console.log(workspace);

            res.json({ message: 'Workspace deleted!' });
        });
    });

module.exports = router;