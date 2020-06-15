# Firebase Hosting & Node.js 프로젝트 올리기

## 작업폴더 다시 작성
* router, views, config 폴더를 모두 functions 폴더로 이동
* functions 폴더의 index.js 삭제
* app.js 파일을 functions 폴더로 이동 후 index.js로 변경

## functions 폴더에서 dependency 변경
* npm i pug
* npm i firebase
* npm i firebase-functions

## functions 폴더에서 dependency 추가
* 사용했던 미들웨어를 functions 내에서 npm 또는 yarn으로 추가 (추가하지 않으면 불러오지 못함)
* npm i http-errors
* npm i moment
* npm i moment-timezone

## functions 폴더에서 package.json 수정
* Firebase에서는 Node_10까지 지원
* "engines": {
    "node": "10"
  },

## 상위 프로젝트 폴더의 firebase.json 수정
* rewrites의 "destination": "/index.html"를 삭제하고
* "function": "application" 추가
* "rewrites": [
      {
        "source": "**",
        "function" : "application"
      }
    ]

## functions 폴더에서 app.js를 변경한 index.js 수정
* var firebaseFunction = require("firebase-functions")
* // module.exports = app;
* exports.application = firebaseFunction.https.onRequest(app);
