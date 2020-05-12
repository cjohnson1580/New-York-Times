var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
var apikey = "icxL9UIxiNTNxhIkMmAdfcvAON18MLZz";
$("#run-search").on("click", function(event) {
    $("#article-section").empty();
    event.preventDefault();
    var queryFullURL = queryURL + "api-key=" + apikey + "&" + "q=";
    var searchTerm = $("#search-term").val().trim();
    queryFullURL += searchTerm;
    var startYear = $("#start-year").val().trim();
    if(startYear) {
        startYear = parseInt(startYear);
        queryFullURL += "&begin_date="+startYear+"0101"
    }
    var endYear = $("#end-year").val().trim();
    if(endYear) {
        endYear = parseInt(endYear);
        queryFullURL += "&end_date="+endYear+"0101"
    }
    console.log(queryFullURL);
    $.ajax({ 
        url: queryFullURL,
        method: "GET"
    }).then(function(result) {
        var articleResults = result.response.docs;
        var articleCount = $("#article-count").val();
        var forLoopCount = 0;
        if(articleCount != null && articleCount != undefined && articleCount != "") {
          forLoopCount = articleCount;
        } else {
            forLoopCount = articleResults.length;
        }
        for(var i = 0; i < forLoopCount; i++) {
            var newArticle = $("<div>");
            newArticle.css("border", "1px solid #000000");
            newArticle.html("<h1>" + articleResults[i].headline.main + "</h1><br /><h3>Publish Date: " + articleResults[i].pub_date + "</h3>");
            $("#article-section").append(newArticle);
        }
    });
});
$("#clear-all").on("click", function(event) {
    event.preventDefault();
    $("#article-section").empty();
})