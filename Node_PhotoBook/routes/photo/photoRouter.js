var express = require("express")
var router = express.Router()
var path = require("path")
var fs = require("fs")
var photoVO = require("../../models/photoBooks")
var photo_dir = path.join(__dirname, "../../", "public", "images")

var multer = require("multer")
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, photo_dir)// 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname)// 콜백함수를 통해 전송될 파일 이름 설정
    }
})
var upload = multer({ storage: storage }).single("pFile")
// ------------------------------------------------------------------------------------

router.get("/", function(req, res) {
    // render() 함수는 view 파일과 데이터를 렌더링하여 web browser에게 html로 전송한다
    photoVO.find()
    .exec(function(err, data) {
        res.render("photo/list", {photos: data})
    })
    
})

router.get("/details/:id", function(req, res) {
    let id = req.params.id
    photoVO.findOne({_id : id})
    .exec(function(err, data) {
        res.render("photo/details", {photo : data})
    })
})

router.get("/upload", function(req, res) {
    res.render("photo/upload", { photo : new photoVO() })
})

router.post("/upload", function(req, res) {
    upload(req, res, function(result) {
        if(result) res.send("파일 업로드 오류")

        // multer가 파일을 정상적으로 업로드했다면 req에 정보를 세팅해서 보내준다
        // req.file 변수의 속성값들을 가지고 DB 저장을 수행한다
        if(req.file) {
            // 원본 파일명
            let originalname = req.file.originalname
            // 실제 저장된 파일명
            let photoname = req.file.filename

            /*
            1. req.body에 form에서 업로드 한 pText, pTitle, pFile이 담겨있다
            2. 하지만 DB에 저장할 때 VO에는 pFile 변수가 따로 없고 pOriginalName과 pPhotoName밖에 없다
            3. multer에 의해 업로드가 된 파일의 정보(원본 파일명, 실제 저장된 파일명)를 req.body에 변수를 설정해주고 저장한다
            4. mongoose를 이용해 DB에 VO를 저장한다
            */
            req.body.pOriginalName = originalname
            req.body.pPhotoName = photoname

            // 현재 req.body에는 form에서 전달받은 pText, pTitle과 기본 세팅된 pDate가 들어있으며
            // 바로 위에서 세팅해준 pOriginalName, pPhotoName도 저장되어 있다
            // 이 req.body를 photoVO의 매개변수에 전달하면 자동으로 photoVO의 변수에 값이 세팅된다
            let vo = new photoVO(req.body)

            // 이 VO에서 mongoose save함수만 호출하면 db에 저장된다
            vo.save(function (err, data) {
                res.redirect("/")
            })
        }
    })
})

router.get("/update/:id", function(req, res) {
    let id = req.params.id
    photoVO.findOne({_id : id})
    .exec(function(err, data) {
        res.render("photo/upload", { photo: data })
    })
})

router.post("/update/:id", function(req, res) {
    upload(req, res, function(error) {
        let id = req.params.id
        // $set은 mongoDB의 키워드
        // 테이블의 모든 칼럼에 조건이 맞으면 update를 수행한다
        // 조건 : _id = id

        if(req.file) {
            let originalname = req.file.originalname
            let photoname = req.file.filename

            req.body.pOriginalName = originalname
            req.body.pPhotoName = photoname
        }

        // update되기 이전의 데이터를 exec() 함수의 data 부분에 임시저장하고
        // update를 수행한 후 해당 데이터를 참조할 수 있도록 남겨놓았다
        photoVO.findByIdAndUpdate({_id : id}, {$set : req.body})
        .exec(function(err, data) {
            if(req.file) {
                let delete_file = path.join(photo_dir, data.pPhotoName)
                // 파일 삭제를 위한 코드
                fs.unlinkSync(delete_file)
            }
            res.redirect("/photo/details/" + id)
        })
    })
})

router.get("/delete/:id", function(req, res) {
    let id = req.params.id
    photoVO.findByIdAndDelete({_id : id}).exec(function(err, data) {
        let delete_file = path.join(photo_dir, data.pPhotoName)
        fs.unlinkSync(delete_file)
        res.redirect("/photo/")
    })
})

module.exports = router