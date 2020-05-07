# React Front Project
## Spring Boot 서버와 React 연동하기
* Spring Boot는 RESTful 서버로 화면단이 없는 서버 역할
* React는 서버로부터 데이터를 수신하여 View를 담당한다
* Spring을 사용하는 RESTful 서버는 @RestController를 사용해서 모든 정보를 JSON으로 보내는 구조가 된다
* React는 Fetch, Axios 등의 도구를 사용하여 서버에 데이터를 요청하고, 수신한 데이터를 미리 만들어진 컴포넌트로 Rendering 후 보여주는 구조가 된다

## react-router-dom
* react는 전통적으로 SPA(Single Page Application) 구조를 가지고 있다. 한 페이지에 스크롤을 하면서 모든 정보를 표현하는 방식.
* 이러한 이유로 과거에는 menu(nav)를 사용해서 페이지를 전환하는 기능이 없었다.
* 시간이 지나며 App을 만들다보니 SPA에서도 메뉴가 필요하기도 하고 CRUD를 구현할 때 SPA 방식은 어색하고 한계가 있었다.
* 그래서 탄생한 것이 router 플러그인이다.

## 사용법
* `import { Link } from "react-router-dom"` 으로 링크걸기 `<Link to="/" className="nav-link">Home</Link>`
* `<BrowserRouter>` 안에 `<Route exact path="/" component={BBsMain} />` 등으로, react-router-dom의 Link 클릭 시 바꿀 내용 선언
* 다른 부분은 전혀 새로고침, Reloading 하지 않으면서 BrowserRouter로 설정한 부분만 갱신(새로고침) 된다
* react-router-dom의 Link가 아닌 anchor 태그 링크 클릭 시 화면 전체가 바뀌게 된다

## BrowserRouter
* Route로 설정된 컴포넌트를 요청된 path에 따라 교체하여 보여주는 영역

## Route
* Route에 설정된 path는 웹브라우저 주소창의 URL중 mapping path에 따라 컴포넌트를 교체하여 보여준다

* Route의 path는 설정하는 규칙이 있다
* path="/" component={Home}
* path="/bbs" component={BBS}
* path="/bbs/write" component={BBS_Write} 세 개를 설정해주면

* "/"에선 Home 컴포넌트,
* "/bbs"에선 Home과 BBS,
* "/bbs/write"에선 Home과 BBS와 BBS_Write 세 개를 전부 보여준다

* 만약 하위 URL인 /bbs에서 상위 URL("/")의 Home 컴포넌트를 보여주고 싶지 않다면 path 대신 exact path를 사용하면 된다

## Link
* a 태그와 비슷하게 사용할 수 있다
* a 대신 Link, href 대신 to를 사용한다
* `<Link to="/">`

## {match}
* match props 변수 사용
* Route의 path에 :변수명 형식을 만들어두고 (`<Route path="/bbs/:name" component={BBS} />`)
* URL에 path/변수값 형식으로 요청하면 변수값이 :변수명에 저장되어 router로 보내진다
* Route 컴포넌트에서는 match를 매개변수로 받고 {match.params.변수명} 형식으로 문자열을 추출할 수 있다

## {location}
* URL 뒤에 ?변수명=값 형식으로 요청하면
* Route 컴포넌트에서는 location를 매개변수로 받고 {location.search} 형식으로 "?변수명=값" 문자열 전부를 추출할 수 있다

## Query String
* yarn add query-string
* import qs from 'query-string' 해서 query-string을 import하기
* const query = qs.parse(location.search) 로 파싱하면 ?변수명=값 중 값만 가져올 수 있다

## react-router-dom
* react-router V4의 react-router-dom
* react-router는 모든 기능, 소스코드가 공개된 라이브러리
* 이 중에서 react에서 DOM과 관련하여 사용할 수 있도록 최적화되어 Build된 라이브러리가 react-router-dom