// Brinng in our scrape script and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// Bring in the Headline and NOte mongoose models
var Headline = require("../models/headline");

module.export = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Headline.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        Headline.remove(query, cb);
    },

    get: function (query, cb) {
        Headline.find(query).sort({
            _id: -1 // Two underscores needed here?
        })
            .exec(function (err, doc) {
                cb(doc);
            });
    },

    update: function (query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}



