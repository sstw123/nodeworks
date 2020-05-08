## 이벤트 핸들러 등록방식
* 먼저 이벤트 핸들러로 사용할 함수를 클래스에 선언한다
* handleEvent = (매개변수) => { 코드 }

* 이벤트 핸들러 등록
* 1. onClick={ this.handleEvent }
* 2. onClick={ this.handleEvent("함수") }
* 차이점
* 1번은 괄호가 없는 객체이기 때문에 이벤트로 등록할 수 있다
* 2번은 괄호가 있는 함수이기 때문에 각 컴포넌트가 렌더링되는 동안 이벤트로 등록되지 않고 선언된 개수만큼 호출하여 자동으로 실행한다

* 2번 코드(이벤트 핸들러에게 어떤 값을 전달하여 그 값을 핸들러 코드 내에서 사용하려고 한다면
* 3. onClick={ (e) => this.handleEvent("함수") } 형식으로
* 익명의 이벤트 핸들러를 등록하고
* (e) => { }
* 이 익명 이벤트 핸들러에서 함수를 호출하도록 코드를 작성해주어야 한다
* (e) => { 함수(매개변수) }

* 이렇게 등록하면 렌더링하는 동안 (e) => { }의 익명 함수만 이벤트 핸들러로 등록
* 이때 내부의 코드는 모두 무시된다
* 모든 렌더링이 끝나고 이벤트를 실행하게 되면 이벤트 핸들러가 자신이 포함하고 있는 함수를 호출하여 원하는 코드를 실행하게 된다

## withRouter

* withRouter
* BrowserRouter 바로 아래 Route로 설정된 컴포넌트(1세대)가 아닌 그 자손 컴포넌트
* 또는 BrowserRouter 밖에 있는 컴포넌트는
* BrowserRouter의 this.props를 직접 전달받지 못한다

* 1대 자손이 아닌 컴포넌트에서 this.props를 사용하려면 객체를 withRouter로 메소드로 wrapping을 해야 한다

* 1. import { withRouter } from "react-router-dom" : import하기
* 2. export default withRouter(bbsItem) : export default 클래스명을 export default withRouter(클래스명)으로 감싸주기