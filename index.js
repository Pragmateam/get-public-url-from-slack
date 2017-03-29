const getPublicUrl = require('./src/getPublicUrl');

const privateUrl = process.argv.slice(2)[0];
const token = process.env.TOKEN;

if (!token) throw new Error('Variable TOKEN is not set');

getPublicUrl(privateUrl, token)
  .then(response => console.info(response))
  .catch(err => console.error(err));
