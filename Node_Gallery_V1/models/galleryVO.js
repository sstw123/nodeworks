var mongoose = require("mongoose")

// MongoDB는 원칙적으로 table 구조가 없는 상태인데
// mongoose를 사용함으로써 RDBMS처럼 table 구조 형식을 생성하여 사용한다
// 사용 중 collection 구조를 변경(칼럼 추가,변경,삭제 등)하였을 경우 변경한 구조가 실제 DB에 반영되지 않는다
// 그럴때는 MongoDB 콘솔에서 collection을 삭제하고 다시 프로젝트를 실행해줘야 한다
// -> db.tbl_galleries.remove({}) 명령 실행

var galleryVO = mongoose.Schema({
    gStrTitle : String,
    gStrText : String,
    gUploadPhotoName : String,// 이미지 업로드할때 변환된 이름
    gOriginalPhotoName : String, // 원본 이미지 이름
    gUploadStartDate : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("tbl_gallery", galleryVO)