const datas = require('./member.json');
console.log(datas.email);

function sendMail(member){
  console.log(`이름:${member.name}, 이메일:${member.email}`);
}

module.exports = { sendMail };