// 의존성 주입으로 설치한 express프레임워크 객체를 참조한다.
// npm i express
var express = require('express'); // 모듈(CJS, ESM)
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//클라이언트에서 서버측에 요청하는 방법에는 GET(조회), POST(등록), PUT(수정), DELETE(삭제)
//GET 메서드의 두번째 파라미터에는 요청객체, 응답객체, 미들웨어 연결
//마이페이지 - 인증 후에 보여지는 메뉴
// -> http://localhost:3000/users/mypage
router.get('/mypage', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', {title: '마이페이지', pageName: 'pages/users/mypage.ejs'})
});
//회원정보수정
// -> http://localhost:3000/users/memberUpdate
router.get('/memberUpdate', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', {title: '회원정보수정', pageName: 'pages/users/memberUpdate.ejs'})
});
//장바구니
// -> http://localhost:3000/users/cart
// -> http://localhost:3000/pages/users/cart -> 404 error 발생
router.get('/cart', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', {title: '장바구니', pageName: 'pages/users/cart.ejs'})
});

// -> http://localhost:3000/users/join
router.get('/join', function(req, res, next) {
  res.render('index', { title: '회원가입', pageName: 'pages/users/join.ejs' });
});

router.post('/join2', function(req, res, next) {
  // 응답을 render함수 사용하면 mine type -> text/html이고
  res.send('post요청 테스트'); //mine type -> text/plain
});

module.exports = router;
