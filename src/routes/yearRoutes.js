const express = require('express');
const path = require('path');
const fs = require('fs');

function getImages(id) {
    var directoryPath = path.join(__dirname, '//..//..//', 'public/images', id);
    var images = fs.readdirSync(directoryPath);

    return images;
}

function getNumberOfImagesForYear(year) {
    var numberOfImages = getImages(year).length;

    return numberOfImages;
}

function router(nav) {
    const yearRouter = express.Router();
    const title = 'Vacation Photos';
    
    yearRouter.route('/')
        .get((req, res) => {
            var numberOfImagesPerYear = [];
            
            for(let i = 0; i < nav.length; i++) {
                var numberOfImages = Number(getNumberOfImagesForYear(nav[i].title));
                numberOfImagesPerYear.push({
                    "year": nav[i].title,
                    "numberOfImages": numberOfImages
                });
            }

            res.render('years', { nav, title, numberOfImagesPerYear});
        });

    yearRouter.route('/:id')
        .get((req, res) => {
            var id = req.params.id;
            var images = getImages(id);

            res.render('year', { nav, title, id, images });
        });

    return yearRouter;
}

module.exports = router;