const express = require('express');
const router = express.Router();
const searchImages = require('./../google/search-images').searchImages;

router.get('/images/:q', (req, res) => {
    if (req.params.q) {
        searchImages(req.params.q).then((images) => {
            res.json({
                data: images,
                status: 200,
                message: ''
            });
        }).catch(() => {
            res.status(500).json({
                data: [],
                status: 500,
                message: 'An error occurred'
            });
        });
    } else {
        res.status(500).json({
            data: [],
            status: 400,
            message: 'No query parameter "q" added'
        })
    }
});

module.exports = router;
