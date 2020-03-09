var mongoose = require("mongoose")

var bookModel = new mongoose.Schema({
    bTitle : {
        type : String,
        required : true
    },
    bWriter : String,
    bComp : String,
    bPrice : Number
},
{
    collection : "bookdb"
})

module.exports = mongoose.model("bookdb", bookModel)