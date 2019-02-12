var Note = require("../models/note"); // Should note be capitalized??
var makeDate = require("../scripts/date");

module.exports = {
    get: function(data, cb) {
        Note.find({
            _headlineId: data._id  // Should headline be camelcase?
        }, cb);
    },

    save: function(data, cb) {
        var newNote = {
            _headlineId: data._id,  // camelcase?
            date: makeDate(),
            noteText: data.noteText
        };

        Note.create(newNote, function(err, doc) {
            if(err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },

    delete: function(data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};


