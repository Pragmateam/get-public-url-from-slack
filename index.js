const getPublicUrl = require('./src/getPublicUrl');

exports.handler = (event, context, callback) => {
  const privateUrl = event.url;
  const slackAPIToken = process.env.SLACK_API_TOKEN;

  console.info('privateUrl: ', privateUrl);
  console.info('slack API token: ', slackAPIToken.replace(/[^-]/g, '*'));

  if (!slackAPIToken) throw new Error('Missing Slack API token');

  getPublicUrl(privateUrl, slackAPIToken)
      .then(response => callback(null, response))
      .catch(err => console.error(err));
};
