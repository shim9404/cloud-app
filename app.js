// 웹 어플리케이션을 위한 기본 설정을 가짐.
// 모듈을 로딩하고 템플릿 엔진 설정하며, 라우트 설정함
// 상단부에는 사용할 모듈을 로딩하는 코드 작성
// 외부 모듈을 해당 파일에 사용하고 싶다면 require()함수 호출함
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

var indexRouter = require('./routes/index');
// 아래는 라우팅을 지원하는 모듈이 있는 물리적인 위치값이다.
var usersRouter = require('./routes/users');
const calendarRouter = require('./routes/calendar')
//insert here
const youtubeRouter = require('./routes/youtube')

var app = express();

// (선택) 커넥션 풀 사용을 위한 글로벌 변수
let pool;

// 서버 시작 전에 커넥션 풀 생성
async function initOracle() {
  try {
    // oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_13' });
    // ↑ thick 모드 사용 시 (윈도우에서 Instant Client 설치했을 때) – 안 쓰면 주석 유지

    console.log('🔄 Oracle 연결 시도 중...');
    console.log(`   연결 정보: ${dbConfig.user}@${dbConfig.connectString}`);

    pool = await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
      // 필요시 옵션
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1,
      // 연결 타임아웃 설정
      connectTimeout: 10000, // 10초
      // 에러 발생 시 자동 재시도 방지 (수동 처리)
      retryCount: 0
    });

    // 연결 테스트
    const testConnection = await pool.getConnection();
    await testConnection.close();
    
    console.log('✅ Oracle 커넥션 풀 생성 완료');
  } catch (err) {
    console.error('\n❌ Oracle 초기화 에러 발생');
    console.error('에러 코드:', err.code);
    console.error('에러 메시지:', err.message);
    
    if (err.code === 'NJS-511' || err.code === 'ORA-12518') {
      console.error('\n📋 해결 방법:');
      console.error('1. Oracle 리스너가 실행 중인지 확인하세요:');
      console.error('   Windows: 서비스 관리자에서 "OracleOraDB21Home1TNSListener" 확인');
      console.error('   또는 명령 프롬프트에서: lsnrctl status');
      console.error('2. Oracle 데이터베이스 서비스가 실행 중인지 확인하세요');
      console.error('3. 포트 1521이 방화벽에 의해 차단되지 않았는지 확인하세요');
      console.error('4. 연결 문자열이 올바른지 확인하세요:', dbConfig.connectString);
      console.error('5. Oracle 서버가 실제로 실행 중인지 확인하세요');
    }
    
    // 서버는 계속 실행하되, DB 연결 없이 동작 (선택적)
    console.error('\n⚠️  서버는 계속 실행되지만 DB 기능은 사용할 수 없습니다.');
    console.error('   DB 연결 후 /dept 엔드포인트를 사용할 수 있습니다.\n');
    // process.exit(1); // 주석 처리하여 서버가 계속 실행되도록 함
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DEPT 목록 조회 API - Oracle DB 연동
app.get('/dept', async (req, res) => {
  let connection;

  try {
    // 커넥션 풀이 없으면 에러
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: '데이터베이스 연결 풀이 초기화되지 않았습니다.'
      });
    }

    // 커넥션 풀에서 커넥션 하나 가져오기
    connection = await pool.getConnection();

    const result = await connection.execute(
      `SELECT deptno as "deptno", dname as "dname", loc as "loc"
         FROM dept
         ORDER BY deptno`,
      [], // 바인드 변수 없으면 빈 배열
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT // 컬럼 이름으로 JSON 받기
      }
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (err) {
    console.error('쿼리 에러:', err);
    res.status(500).json({
      success: false,
      message: 'DB 조회 중 에러 발생',
      error: err.message
    });
  } finally {
    if (connection) {
      try {
        await connection.close(); // 커넥션 반납 (풀로 돌아감)
      } catch (closeErr) {
        console.error('커넥션 닫기 에러:', closeErr);
      }
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/calendar',calendarRouter)
//insert here
app.use('/youtube', youtubeRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Oracle DB 초기화 (서버 시작 시 실행)
initOracle().catch(err => {
  console.error('Oracle 초기화 실패:', err);
  process.exit(1);
});