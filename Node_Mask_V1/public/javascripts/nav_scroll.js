$(function() {
    let preScroll = $(window).scrollTop()
    $(window).scroll(function(event) {
        let curScroll = $(window).scrollTop()

        if(preScroll > curScroll) {
            $("ul.main-menu").css("top", 0)
        } else {
            $("ul.main-menu").css("top", -100)
        }

        preScroll = curScroll
    })
})