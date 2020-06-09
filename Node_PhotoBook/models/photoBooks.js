var mongoose = require("mongoose")
var photoVO = mongoose.Schema({
    pTitle : String,
    pText : String,
    pOriginalName : String,
    pPhotoName : String,
    pDate : {type: Date, default: Date.now() }
})

// 실제 테이블은 tbl_photo_books로 생성된다
module.exports = mongoose.model("tbl_photo_book", photoVO)

