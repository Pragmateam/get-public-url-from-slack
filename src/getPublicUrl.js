const https = require('https');
const querystring = require('querystring');

const getFileName = (url) => {
  const parts = url.split('/');

  return parts[parts.length - 2];
};

const composeSharedPublicUrlWith = (args) => {
  const host = 'https://slack.com';
  const command = 'files.sharedPublicURL';

  return `${host}/api/${command}?${querystring.stringify(args)}`;
};

const httpGet = url => new Promise((resolve, reject) => {
  const request = https.get(url, (response) => {
    response.setEncoding('utf8');

    response.on('data', data => resolve(JSON.parse(data)));
  });

  request.on('error', error => reject(error));
  request.end();
});

const getPublicUrl = (privateUrl, token) => {
  const options = { token, file: getFileName(privateUrl) };
  const url = composeSharedPublicUrlWith(options);

  const promisedRequest = httpGet(url).then((response) => {
    console.info('Slack API response:', response);

    if (response.ok) {
      return response.file.permalink_public;
    }

    return '';
  }).catch(err => err);

  return Promise.resolve(promisedRequest);
};

module.exports = getPublicUrl;
