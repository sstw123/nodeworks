import mongoose from "mongoose"

const bucketModel = new mongoose.Schema({
    b_order : {
        type : Number,
        unique: true
    },
    b_content : {
        type : String
    },
    b_success : Boolean
})

module.exports = mongoose.model("tbl_bucket", bucketModel)