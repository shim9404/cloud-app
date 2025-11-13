/**
 * Common JS - 브라우저 외부 환경에서 자바스크립트 모듈 생태계의 규칙을 정의하기 위해서 시작된 프로젝트
 * - 모듈
 * - 패키지(package.json)
 * 
 * 1파일 = 1모듈
 * 
 * CJS 동작원리
 * Resolution(모듈 경로 확인) - Loading(모듈 로드) - Wrapping(코드 래핑) -Evaluation(코드 실행) - Caching(결과 캐싱)
 */
const memberCreate = require('./memberCreate.cjs');
console.log(memberCreate);

const newMember = memberCreate.createMember("김유신","kim@hot.com","마포구 공덕동");
