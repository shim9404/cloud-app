import { createMember } from "./memberService.mjs";

const member = createMember("nice");
console.log(`생성된 회원은 ${member.name}입니다.`);
