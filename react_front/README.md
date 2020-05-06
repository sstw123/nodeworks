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