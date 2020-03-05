// DB 형식을 설정하는 js (형틀)
// mongoose.Schema({}) 내부에 설정한 변수값
// 만약 
var mongoose = require("mongoose")
var bookModel = mongoose.Schema({
    bName : {
        type : String,
        required : true, // Not Null
        unique : true, // Unique
        trim : true // 문자열 빈칸 지우기
    },
    bCompany : String,
    bWriter : String,
    bPrice : Number,
    bYear : {
        type : String,
        lowercase : true
    }
})
/*
model()에 설정하는 document(book) 이름은 반드시 단수로 지정하는 것이 좋다
실제 db에 저장될때는 document 이름이 복수로 변경되어 저장된다
mongo console에서 조회할 때 db.books.find({}) 형식
*/
module.exports = mongoose.model("book", bookModel)