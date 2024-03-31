// add this to the end of the file which requires header to be present in the web page
{/* <script src="http://127.0.0.1:8001/static/header_loading_helper.js"></script> */}

$(document).ready(function() {
    loadHeader();
});

function loadHeader() {
    // Load the CSS
    $('<link>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'http://127.0.0.1:8001/static/header_of_all_html_docs.css'
    }).appendTo('head');

    // Load the HTML
    $("#header").load("http://127.0.0.1:8001/static/header_of_all_html_docs.html", function() {
        // After the HTML is loaded, load and execute the JavaScript
        $.getScript("http://127.0.0.1:8001/static/header_of_all_html_docs.js");
    });
}
