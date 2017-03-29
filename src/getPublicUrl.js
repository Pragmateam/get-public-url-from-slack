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

const httpGet = url => new Promise((resolve) => {
  https.get(url, (response) => {
    response.setEncoding('utf8');
    response.on('data', data => resolve(JSON.parse(data)));
  });
});

const getPublicUrl = (privateUrl, token) => {
  const options = { token, file: getFileName(privateUrl) };
  const url = composeSharedPublicUrlWith(options);

  const promisedResponse = httpGet(url).then((response) => {
    if (response.ok) {
      return response.file.permalink_public;
    }

    return '';
  });

  return Promise.resolve(promisedResponse);
};

module.exports = getPublicUrl;
