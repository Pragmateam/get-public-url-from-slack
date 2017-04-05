const getPublicUrl = require('./src/getPublicUrl');

exports.handler = (event, context, callback) => {
  console.info('event: ', event);

  const privateUrl = event.url;
  const slackAPIToken = process.env.SLACK_API_TOKEN;

  if (!slackAPIToken) throw new Error('Missing Slack API token');

  console.info('slack API token: ', slackAPIToken.replace(/[^-]/g, '*'));

  getPublicUrl(privateUrl, slackAPIToken)
    .then(response => {
      console.log('response: ', response);

      return callback(null, response);
    }).catch(err => console.error(err));
};
