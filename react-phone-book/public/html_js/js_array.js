// arr 배열의 각 요소값을 개별 변수에 담아서 사용하고 싶을 때
var arr = ["홍길동", "이몽룡", "성춘향", "라푼젤"]
// ES5 이하의 버전에서 사용하던 코드
// var hong = arr[0]
// var lee = arr[1]
// var seong = arr[2]
// var ra = arr[3]

const [hong, lee, seong, ra] = arr
console.log("hong", hong)
console.log("lee", lee)
console.log("seong", seong)
console.log("ra", ra)

const names = {name:"이름123", phone:"1234", addr:"서울특별시"}
// var name = names.name
// name = names["name"]

const { name, addr, phone } = names

// console.log(name)
// console.log(phone)
// console.log(addr)

const my = { [name]: "홍길동", 주소: "서울특별시" }
console.log(my.이름123)
console.log(my.주소)