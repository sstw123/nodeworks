$(function() {

    // 수정 클릭시 수정 폼 보이기
    $(document).on("click", ".edit", function(e) {
        e.stopPropagation()

        let id = $(this).closest(".info_article").attr("data-id")
        let text = $(".info_article[data-id='" + id + "'] p").text()

        // info_form 보이게 변경
        $(".info_form").removeClass("inactive")
        $(".info_form").addClass("active")
        // info_form 위치 이동
        $(".info_form").appendTo(".info_article[data-id='" + id + "'] .form")
        $(".info_form").value(text)
    })
})