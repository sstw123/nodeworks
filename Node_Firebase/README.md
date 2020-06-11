# Google의 Firebase + Node.js 연동 프로젝트
* firebase.google.com 페이지를 통해서 프로젝트를 설정
* Realtime DB(Cloud DB로 업그레이드 중) : Cloud DB를 사용하여 CRUD를 구현하기 위한 서비스
* Hosting : 홈페이지(static web)를 외부에서 접근할 수 있도록 만들어주는 서비스
* Firebase functions : node project를 firebase host에서 실행할 수 있도록 지원하는 클라우드

## firebase 연동을 위해 tools 설치
* firebase-tools : npm install -g firebase-tools

## Node.js에서 Firebase의 Realtime Database 연동
* npm install firebase 또는 npm install firebase-admin
* config 설정값 작성(config 폴더 생성 후 firebaseConfig.json 파일 생성)

## 프로젝트 초기화
* firebase 프로젝트 초기화 : firebase init

## 프로젝트를 firebase 서버에 올리기
* firebase deploy

## 프로젝트 로컬에서 테스트하기(nodemon 대신 사용)
* firebase serve

## 날짜 관련 미들웨어
* npm i moment : LocalDate같은 날짜 관련 미들웨어
* npm i moment-timezone : 날짜 타임존 설정