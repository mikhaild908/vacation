const express = require('express');
const path = require('path');
const fs = require('fs');

function router(nav) {
    const yearRouter = express.Router();
    const title = 'Vacation Photos';

    yearRouter.route('/')
        .get((req, res) => {
            res.render('years', { nav, title });
        });

    yearRouter.route('/:id')
        .get((req, res) => {
            var id = req.params.id;
            var directoryPath = path.join(__dirname, '//..//..//', 'public/images', id);
            var images = fs.readdirSync(directoryPath);

            res.render('year', { nav, title, id, images });
        });

    return yearRouter;
}

module.exports = router;