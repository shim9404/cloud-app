// dbConfig.js
module.exports = {
  user: 'scott',          // 오라클 계정
  password: 'tiger',      // 비밀번호
  // 연결 문자열 형식 옵션:
  // 1. 'localhost:1521/orcl11' (기본 형식)
  // 2. '127.0.0.1:1521/orcl11' (IP 주소 사용)
  // 3. '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orcl11)))' (TNS 형식)
  connectString: 'localhost:1521/xe'
};