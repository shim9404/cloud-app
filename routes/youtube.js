var express = require('express'); // 모듈(CJS, ESM)
var router = express.Router(); // 함수의 괄호가 아니라 객체 괄호 - 생성자 함수

// GET user listen
//get메서드는 파라미터가 두 개이다.
//첫번째 파라미터 자리에는 endpoint가 온다.
//두번쨰 파라미터 자리에는 (req: 요청객체 ,res: 응답객체, next:미들웨어를 호출하는 함수. 서버구축할 때 사용함)
// -> http://localhost:3000/youtube
router.get("/", function(req, res, next){
  res.send('유튜브 페이지'); // mine type -> text/plain
})

//유튜브1
// -> http://localhost:3000/youtube/youtube1
router.get("/youtube1", function(req, res, next){
  res.render('index', {title: '인기동영상', pageName: 'pages/youtube/youtube1.ejs'}) //-> text.html -> xxx.ejs(태그와 Data 섞어쓰기)
})

//유튜브2
// -> http://localhost:3000/youtube/youtube2
router.get("/youtube2", function(req, res, next){
  res.render('index', {title: '동영상 검색', pageName: 'pages/youtube/youtube2.ejs'}) //-> text.html -> xxx.ejs(태그와 Data 섞어쓰기)
})

//유튜브3
// -> http://localhost:3000/youtube/youtube3
router.get("/youtube3", function(req, res, next){
  res.render('index', {title: '쇼츠 검색', pageName: 'pages/youtube/youtube3.ejs'}) //-> text.html -> xxx.ejs(태그와 Data 섞어쓰기)
})


module.exports = router;