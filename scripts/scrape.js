// Scrape script

// Require request and cheerio, making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) { //cb = callback

    request("https://www.nytimes.com", function (err, res, body) {

        var $ = cheerio.load(body);

        var articles = [];

        $(".css-8atqhb").each(function (i, element) {   // css-8atqhb = article class
            
            var head = $(this).children(".css-6h3ud0").text().trim(); // css-6p6lnl = story heading class
            var sum = $(this).children(".css-6h3ud0").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    healine: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports - scrape;