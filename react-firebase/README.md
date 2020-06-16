# React 기반 프로젝트 Firebase 연동 및 배포하기
* Firebase의 Realtime Database와 hosting을 연동하여 Deploy 수행

## Firebase 연동 프로젝트 수행
* npm i -g firebase-tools
* firebase login

## Firebase에서 새 프로젝트 만들기
* 프로젝트 만든 후 Settings로 이동
* </> 클릭, 앱 닉네임 설정 후 등록

## 현재 프로젝트에 Firebase 설정
* var firebaseConfig부터 `</script>` 바로 전 firebase.initializeApp(firebaseConfig); 까지 복사 (Firebase 설정에서 다시 볼 수 있음)
* src 폴더 안에 firebaseConfig.js 생성 후 붙여넣기

* firebase init -> database, hosting 선택
* Use an existing project -> 프로젝트 선택
* 이후는 그냥 다 Enter

* yarn add firebase 또는 npm i firebase로 프로젝트 내에 firebase 미들웨어 받기

* firebase.json -> hosting -> public 값을 "public"에서 "build"로 바꿔주기

* (선택) yarn start 또는 npm start로 확인해보기

## Firebase에 Deploy(배포)하기
* yarn build : react나 vue 등을 사용할 때 해줘야 함
* firebase deploy

## (선택) yarn build와 firebase deploy 과정을 한번에 할 수 있도록 하기
* package.json -> scripts -> 마지막(eject) 다음에 , "deploy": "react-scripts build && firebase deploy" 추가
* 이후 npm run deploy 또는 yarn deploy 입력 시 실행

## project에 bootstrap 설정
* yarn add bootstrap@4
* yarn add reactstrap
* yarn add react-addons-transition-group
* yarn add react-addons-css-transition-group
* 한번에 하려면 yarn add bootstrap@4 reactstrap react-addons-transition-group react-addons-css-transition-group

* src/index.js 파일에 import "bootstrap/dist/css/bootstrap.css"

## react-router-dom 설치
* yarn add react-router-dom

## Router + Link 이용하기
* React는 app.js밖에 열지 않는다
* app.js 설정 : import {BrowserRouter as BR, Route} from "react-router-dom"
* import MainMenu from "./bbs/MainMenu"
* 항상 보여줄 내용 : MainMenu
* MainMenu.jsx 설정 : import {Link} from "react-router-dom"
* React는 a태그가 없으므로 a태그 대신 Link를 이용한다. `<Link to="/" className="nav-link text-white">`
* 주소에 따라 보여줄 내용 : Route
* `<BR><MainMenu/><Route exact path="/" component={BBsMain}></BR>` : MainMenu 컴포넌트는 항상 보여주고 BBsMain 컴포넌트는 주소가 root일때만 보여준다

## js에서 사용하는 날짜 관련 dependency 설치
* yarn add moment
* yarn add moment-timezone
* yarn add react-moment : 리액트에서 moment를 사용하기 위해 설치해야하는 미들웨어