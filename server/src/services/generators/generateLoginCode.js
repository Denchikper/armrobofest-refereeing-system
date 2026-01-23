exports.generateLoginCode = async (cnt_simbol) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < cnt_simbol * 2; i++) {
    if (i > 0 && i % cnt_simbol === 0) {
      code += '-';
    }
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};