const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

const getPublicUrl = require('./src/getPublicUrl');

module.exports = api;

api.get('/public-url', (request) => {
  const privateUrl = request.queryString.url || request.queryString.text;
  const slackAPIToken = process.env.SLACK_API_TOKEN;

  if (!slackAPIToken) throw new Error('Missing Slack API token');

  console.info('slack API token:', slackAPIToken.replace(/[^-]/g, '*'));
  console.info('private url:', privateUrl);

  return getPublicUrl(privateUrl, slackAPIToken)
    .then(response => response).catch(err => console.error(err));
}, { success: { contentType: 'text/plain' } });
