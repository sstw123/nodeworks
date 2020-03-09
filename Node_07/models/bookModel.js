var mongoose = require("mongoose")

var bookModel = mongoose.Schema({

    bTitle : String,
    bWriter : String,
    bComp : String,
    bPrice : Number

})

module.exports = mongoose.model("tbl_book", bookModel)