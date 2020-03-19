console.log("나는 자바스크립트")

// JSON type의 객체 선언
var std = {name : "홍길동", age : 30, tel : "1234"}
// 숫자형 배열 선언
var arrNumber = [1,2,3,4,5]

var arrString = ["홍길동", "이몽룡", "성춘향", "장보고"]

// console.log(값1 + 값2 + 값3) : 각각의 값들을 전부 문자열로 출력
// console.log(값1, 값2, 값3) : 각각의 값들을 형변환 하지 말고 형태 그대로 출력
console.log(std + arrNumber + arrString)
console.log("객체 :", std)
console.log("숫자형 :", arrNumber)
console.log("문자열형 :", arrString)

// 객체 요소 중 일부를 변경할 때
var std = {...std, age: 100}// ...std를 전부 복사한 뒤 age만 100으로 바꾸기
std.age = 100
var std = {name: std.name, age: 100, tel: std.tel}
console.log("객체 std :", std)

// forEach() : 배열을 한개씩 순회하며 요소들을 callback 함수에 전달하여 코드를 수행한다
// 하지만 forEach는 비동기 방식이기 때문에 forEach가 끝난 후 값을 조회하면
// forEach의 순회에서 계산된 결과가 정확히 조회된다는 보장이 없다
let sum = 0;
let sum2 = 0;
arrNumber.forEach(function(item, index, originalArray) {
    sum += item//1번 코드
    sum2 += originalArray[index]//1번과 같은 연산 코드
})
console.log("forEach 함수 결과1:", sum)
console.log("forEach 함수 결과2:", sum2)

// 배열 순회 후 정확한 결과를 보장받으려면 동기방식의 for를 사용해야 한다
sum = 0;
for(let i = 0; i < arrNumber.length; i++) {
    sum += arrNumber[i]
}
console.log("합계=", sum)

// map() : 
// 1. 배열을 순회하면서 각 요소를 callback 함수에 전달하고
// 2. callback 함수가 return하는 값들을 모아서 새로운 배열로 생성한다
const arrNumber2 = arrNumber.map((item) => {
    return item + 2
});

console.log("원래 배열 :", arrNumber)
console.log("map에서 저장된 배열 :", arrNumber2)

// find() : 조건에 맞는 값들 중 가장 빠른 index에 있는 값 가져오기
// 배열요소 중 콜백함수의 조건에 맞는 값 찾기(true 리턴 -> item을 변수에 저장)
// 사용법
// 1. find()의 콜백함수는 화살표 함수를 이용하는 경우 다른 코드없이 return문 1줄만 있을 경우 중괄호를 생략하고 return 키워드를 생략할 수 있다
// 2. find()의 콜백함수는 화살표 함수의 매개변수가 1개만 있는 경우 (item)의 소괄호 없이 item으로 바로 사용 가능
// 3. find()의 콜백함수는 매개변수가 0개이거나 2개 이상인 경우 소괄호 필수
const string2 = arrString.find(item => item === "성춘향")
console.log("성춘향 :", string2)

const string3 = arrString.find(item => {return item === "장보고"})
console.log("장보고 :", string3)

// findIndex() : 찾는 아이템이 몇번째 index에서 처음으로 나타났는지 확인
const string4 = arrString.findIndex(item => item === "홍길동")
console.log("첫번째 홍길동의 index :", string4)

// filter() : 조건에 맞는 값 전부 반환하기
const arrNumber3 = [2,5,2,3,41,3,1,3,3,4,5,2,1,2,3,4]
const evenNumber = arrNumber3.filter(item => {
    return item % 2 === 0
})
console.log("짝수:", evenNumber)

// reduce() : map, find, filter를 전부 구현 가능
// forEach 수행이 끝난 후 연산결과를 조회했을 때 연산 결과의 정확도를 보장할 수 없는 문제를 해결한 함수
// now = 1로(처음 값) 시작해서 다음 값 더하기
// now, next를 더하고 최종 결과값 return
const arrNumber4 = [1,2,3,4,5]
const reduce = arrNumber4.reduce( (now, next) => {
    return now + next
})
console.log("reduce:", arrNumber4, reduce)

// sort() : 1차원 배열일 경우 배열 정렬 가능
const sortString1 = arrString.sort()
console.log("정렬:", sortString1)

// sort()
// callback 함수에서 1을 return하면 아무 일도 하지 않는다(오름차순 정렬에 사용 가능, asc)
// -1을 return하면 자리 바꿈(역순정렬, 내림차순 정렬에 사용 가능, desc)
const sortString2 = arrString.sort((item, item2) => {
    if ( item > item2 ) return -1
})
console.log("정렬:", sortString2)

const mask = [
    {name : "가든약국", state:"P"},
    {name : "뒷집약국", state:"E"},
    {name : "앞집약국", state:"E"},
    {name : "푸른약국", state:"E"},
    {name : "중흥약국", state:"E"},
    {name : "용봉약국", state:"P"},
    {name : "전대약국", state:"E"},
    {name : "조대약국", state:"P"},
    {name : "충장약국", state:"E"}
]
const p_mask = mask.filter(item => {
    return item.state === "P"
})
console.log("p_mask", p_mask)

const e_mask = mask.filter(item => {
    return item.state === "E"
})
console.log("e_mask", e_mask)

const p_sort_mask = p_mask.sort((item1, item2) => {
    if(item1.name > item2.name) return 1
})
console.log("p_sort_mask", p_sort_mask)

const e_sort_mask = e_mask.sort((item1, item2) => {
    if(item1.name > item2.name) return 1
})
console.log("e_sort_mask", e_sort_mask)

const mask_list = [...p_sort_mask, ...e_sort_mask]
console.log("마스크 구입처", mask_list)