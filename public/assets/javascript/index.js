// Global bootbox
$(document).ready(function () {
  
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    
    // Once page is ready, run the initPage function to kick things off
    initPage();

    function initPage() {
        // Empty article container, run AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved-false")  // Any syntax errors here?
            .then(function (data) {
                // If we have headlines, render them to the page
                if (data && data.length) {
                    renderArticles(data);
                }
                else {
                    // Otherwise render a message explaining we have no articles
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        
        var articlePanels = [];

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }

        articleContainer.append(articlePanels);
    }

    function createPanel(article) {

        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));
        // We attached the articles in do the jquery element
        // We will uyse this when trying to figure out which article the user wants to save
        panel.data("_id", article._id);
        // We return the constructed panel jquery elements
        return panel;
    }

    function renderEmpty() {
       
        var emptyAlert =
            $(["<div class='alert alert-warning text center'>",
                "<h4>Uh oh. Looks like we don't have any new articles.<h/4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try scraping new articles</a></h4>",
                "<h4><a href='/saved'>Go to saved articles</a></h4",
                "</div>",
                "</div>"
            ].join(""));
        // Appending this data to the page
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
      
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
        // Using a patch method to be semantic since this is an update to an existing record in our collection
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
            .then(function (data) {
                // If successful, mongoose will send back an object containing a key of "ok" with the value of 1
                // (which casts to 'true')
                if (data.ok) {
                    // Run the initPage function again. This will reload the entire list of articels
                    initPage();
                }
            });
    }

    function handleArticleScrape() {
        // This function habdles the user clicking any "scrape new article" buttons
        $.get("/api/fetch")
            .then(function (data) {
            
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>")  // Video had last tag as <h3>
            });
    }
});
