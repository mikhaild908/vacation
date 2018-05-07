const express = require('express');

function router(nav) {
    const yearRouter = express.Router();

    yearRouter.route('/')
        .get((req, res) => {
            res.send('years'); // TODO: create and render from template
        });

    yearRouter.route('/:id')
        .get((req, res) => {
            var id = req.params.id;
            res.send(id); // TODO: create and render from template
        });

    return yearRouter;
}

module.exports = router;