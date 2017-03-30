const getPublicUrl = require('./src/getPublicUrl');

exports.handler = (event, context, callback) => {
  const privateUrl = event.privateUrl;
  const token = process.env.TOKEN;

  if (!token) throw new Error('Variable TOKEN is not set');

  getPublicUrl(privateUrl, token)
      .then(response => callback(null, response))
      .catch(err => console.error(err));
};
