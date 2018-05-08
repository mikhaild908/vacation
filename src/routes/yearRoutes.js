const express = require('express');

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
            res.render('year', { nav, title, id });
        });

    return yearRouter;
}

module.exports = router;