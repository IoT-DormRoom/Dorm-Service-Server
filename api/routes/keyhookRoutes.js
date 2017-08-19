'use strict';
module.exports = function(app) {
    var keyhook = require('../controllers/keyhookController');

    app.route('/keyhook')
        .get(keyhook.getAllKeyhooks);

    //app.route('/keyhook/:id')
    //    .get(keyhook.getKeyhook);

    //app.route('/keyhook/:id/calibrate')
    //    .put(keyhook.calibrate);
};
