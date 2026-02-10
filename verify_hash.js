const bcrypt = require('bcryptjs');
const hash = '$2b$10$EeLBRnrs2htJaCyPYEqrlOCEqq6THocyE5oPFgQQAGx3A3oT83B4Qi';
const password = 'password123';
console.log('Comparing:', password, 'with', hash);
console.log('Match:', bcrypt.compareSync(password, hash));
console.log('NewHash:', bcrypt.hashSync(password, 10));
