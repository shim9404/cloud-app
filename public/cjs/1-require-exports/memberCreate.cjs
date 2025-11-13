const memberDataService = require('./memberDataService.cjs');

function createMember(name, email, address) {
  const member = { 
    "name": name, 
    "email": email, 
    "address": address 
  }
  memberDataService.sendMail(member);
  return member;
}

module.exports = { createMember };