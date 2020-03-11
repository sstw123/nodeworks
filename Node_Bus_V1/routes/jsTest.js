// JS방식
function userIdCheck(userId) {
    userId = userId || 'id 없음'
}

// 전통적인 방식
function userIdCheck(userId) {
    if(!userId) {
        userId = "id 없음"
    }
}