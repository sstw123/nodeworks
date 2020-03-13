# 이미지 갤러리

## muloter 미들웨어를 활용한 이미지 업로드 게시판
## MongoDB와 mongoose를 연동하여 데이터 CRUD 구현

## MongoDB 용어 정리

# db
* RDBMS에서 DB와 같은 역할을 한다. main schema
* show dbs : db들의 목록을 확인하는 명령
* use db123 : db123이라는 이름으로 비어있는 schema를 생성하거나, 이미 있는 스키마라면 사용할 수 있도록 open한다

# collection
* RDBMS에서 TABLE과 같은 역할을 한다. 실제 데이터가 저장되는 작은 공간
* show collection : collection의 목록을 확인한다
* db.collection.쿼리명령
* db.tbl_books.insert({변수 : 값}) : tbl_books 컬렉션을 생성하고 새로운 데이터 추가하기. 만약 컬렉션이 이미 있으면 기존 컬렉션에 데이터 추가

* db.collection.drop() : 컬렉션을 통째로 삭제

# document
* RDBMS에서 한 개의 Record와 같은 역할
* db.collection.remove({}) : 컬렉션 내의 모든 document 삭제
* db.collection.find({}) : 조회 retrieve, read