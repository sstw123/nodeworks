import firebase from "firebase"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVFeHUFkv9eOqJN3uSg8LRFhm-oDNuaLk",
    authDomain: "fir-react-b72bc.firebaseapp.com",
    databaseURL: "https://fir-react-b72bc.firebaseio.com",
    projectId: "fir-react-b72bc",
    storageBucket: "fir-react-b72bc.appspot.com",
    messagingSenderId: "761245984265",
    appId: "1:761245984265:web:cd0fe7e92f873e53f07ad8"
  };
  
/*
  다른 js 파일에서 fire() 함수를 호출하여
  firebase 초기화와 database 연동까지 할 수 있도록 모듈 구성

  firebaseConfig.js 모듈을 여러 곳의 Component에서 공유하여 사용할 예정인데
  firebase.initializeApp() method가 여러 번 실행되면 문제를 일으킨다
  따라서 firebase.apps 항목이 없는 경우에만 새로 생성하도록 코드를 변경
*/


//export const fire = () => {
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
  
//}
export const database = firebase.database()