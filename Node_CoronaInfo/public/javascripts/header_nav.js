$(function() {
    
    $("header").click(function() {
        document.location.href = "/"
    })

    $("nav li").click(function(e) {
        
        if( $(e.target).is(".home")) {
            document.location.href = "/corona"
        } else if ( $(e.target).is(".info")) {
            document.location.href = "/corona/info"    
        } else if ( $(e.target).is(".statistics")) {
            document.location.href = "/corona/statistics"    
        } else if ( $(e.target).is(".route")) {
            document.location.href = "/corona/route"    
        }
        
    })

})