var Data = require('./models/data');

module.exports = function(app) {
    // sample api route
    app.get('/api/data', function(req, res) {
        Data.find(function(err, data) {
            if (err) {
                res.send(err);
            }

            res.json(data);
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
};