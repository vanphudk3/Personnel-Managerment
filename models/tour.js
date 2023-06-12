var db = require('../config');

var tour = {
    getAllTour: function (callback) {
        return db.query("Select * from tours", callback);
    },

    getTourById: function (id, callback) {
        return db.query("select * from tours where Id=?", [id], callback);
    },
};

module.exports = tour;