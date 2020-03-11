var mongoose = require("mongoose")
var stationVO = mongoose.Schema({
// 항목명(영문)	항목명(국문)	항목크기	항목구분	샘플데이터	항목설명
	STATION_NUM : String,//	레코드 구분	5	1	1	
	BUSSTOP_ID : String,//	정류소 ID	5	1	2513	
	BUSSTOP_NAME : String,//	정류소 명(국문)	30	1	동원촌	
	NAME_E : String,//	정류소 명(영문)	60	1	Dongwonchon	
	LONGITUDE : String,//	위도	13	1	126.82839444	
	LATITUDE : String,//경도
	ARS_ID : String,//ARS 검색 ID
	NEXT_BUSSTOP : String,//다음 버스 승강장
})

module.exports = mongoose.model("station", stationVO)