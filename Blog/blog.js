//all the endpoints

const express = require('express');
const db = require('../data/db');
const router = express.Router();


router.get('/', (req, res) => {
    db.find()
        .then(db => {
            res.json(db);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'Unable to download DB'
            })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(getId => {
            if (getId.length) {
                res.json(getId);
            } else {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Failed to get ID'
            })
        })
})


router.post('/', (req, res) => {
    const newBlog = req.body;

    db.insert(newBlog)
        .then(newItem => {
            console.log(newItem);
            if (newItem) {
                const { id } = newItem;
                db.findById(id)
                    .then(data => {
                        res.status(200).json(data);
                    })
            } else {
                res.status(404).json({
                    message: "You suck try again!"
                })
            }
        })
        .catch(({ message }) => {
            res.status(500).json({
              message
            })
        })


})

router.put('/:id', (req, res) => {
    const { id } = req.params;

    const change = req.body;

    db.update(id, change)
        .then(updatedDB => {
            if (updatedDB) {
                db.findById(id)
                    .then(data => {
                        res.status(200).json(data);
                    })
            } else {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            }
        })

})

router.delete('/:id', (req, res) => {

    const { id } = req.params;
    db.remove(id)
        .then(deletedDB => {
            if (deletedDB) {
                res.json(deletedDB);
            }
            res.status(404).json({
                message: 'Invalid ID'
            })

        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'Failed to delete new DB'
            })
        })
})




module.exports = router;