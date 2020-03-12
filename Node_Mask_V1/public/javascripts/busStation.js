$(function() {
    $(".bus_tr").click(function() {
        let id = $(this).data("id")
        
        $.ajax({
            url : "/bus/bustime",
            type : "get",
            data : {id : id},
            success : function(result) {
                $("#bustime").html(result)
            }
        })
    })
})