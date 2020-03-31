$(function() {
    $("span.view_more").click(function() {
        if($(this).hasClass("info")) {
            document.location.href = "/corona/info"
        } else if($(this).hasClass("statistics")) {
            document.location.href = "/corona/statistics"
        } else if($(this).hasClass("route")) {
            document.location.href = "/corona/route"
        }
        
    })
})