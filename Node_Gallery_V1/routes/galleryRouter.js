var express = require("express")
var router = express.Router()
var galleryVO = require("../models/galleryVO")

// 파일(이미지) 업로드를 위한 multer 설정
var multer = require("multer")
// 파일을 어디에, 어떻게 업로드 할 것인지 설정이 담긴 객체 생성
// destination : 목적지(폴더 path) 설정
// filename : 업로드 시 원본파일명을 업로드용 UUID가 붙은 filename을 생성한다

var path = require("path")// Node.js의 기본 path 모듈

var storage = multer.diskStorage(
    {
        destination : (req, file, callbackFunc) => {
            var uploadPath = path.join(__dirname, "/../", "public" ,"uploads")//업로드 path 설정
            console.log(uploadPath)// Node_gallery_V1/public/uploads

            callbackFunc(null, uploadPath)//destination 디렉토리 설정
        },
        filename : (req, file, callbackFunc) => {
            // 업로드된 파일이름을 변환하여 해킹에 대비
            var uploadFileName = Date.now() + "_" + file.originalname//파일명 만들기

            callbackFunc(null,uploadFileName)//filename 파일명 설정
        }
    }
)

// 실제로 파일을 업로드하는 함수
var saveFile = multer( {storage : storage} )

router.get("/", (req, res) => {
    galleryVO.find({})
    .exec((err, galleries) => {
        res.render('index', {galleryList : galleries})
    })
})

router.get("/view/:id", (req, res) => {
    let id = req.params.id
    galleryVO.findOne({_id : id})
    .exec((err, data) => {
        res.render("gallery/view", {gallery : data})
    })
})

router.get("/update/:id", (req, res) => {
    let id = req.params.id
    galleryVO.findOne({_id : id}, function(err, data) {
        res.render("gallery/upload", {gallery : data})
    })
})

// put method
// RESTful 방식에서 사용할 수 있는 4가지 method
// get, post, put, delete
// 이 중 put, delete는 ajax로 사용 가능(form에서는 get, post만 지원하며 put, delete는 불가능)
router.put("/update/:id", (req, res) => {
    let id = req.params.id
    galleryVO.update({_id : id}, {$set:req.body}, function(err,data) {
        //res.redirect("/gallery/view/" + id)
        if(err) {
            res.json({msg: "UPDATE FAIL", data : data})
        } else {
            res.json({msg: "OK", data : data})
        }
    })
})

router.get("/upload", (req, res) => {
    let gallery = new galleryVO()
    res.render("gallery/upload", {gallery : gallery})
})

// multer를 이용해 파일 업로드하기
// 1. saveFile 함수를 사용해서 파일을 업로드하기
// 2. saveFile() callback 에서 변경된 파일명(업로드파일명)을 가져오기
// 3. 변경된 파일명(업로드파일명)을 DB에 저장
router.post("/upload", saveFile.single("gOriginalPhotoName"), function(req, res) {
    // 원래 req.file 객체는 web form에서 업로드한 파일에 대한 정보만 담겨있다
    // 그 중 originalname은 원본 파일이름이다
    // 웹 form에 gOriginalPhotoName tag가 있는 것처럼 새로운 변수를 추가해서 거기에 originalname 값 세팅
    req.body.gOriginalPhotoName = req.file.originalname

    // 원래 tag에 있던 gUploadPhotoName에는 새로 변경된 파일 이름을 저장해둔다
    // req.file.filename은 saveOptions에 설정된 filename : 의 값이 세팅되어 있다
    req.body.gUploadPhotoName = req.file.filename
    var vo = new galleryVO(req.body)
    vo.save(function(err, data) {
        res.redirect("/gallery")
    })
})

module.exports = router