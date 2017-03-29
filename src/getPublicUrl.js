const https = require('https');
const querystring = require('querystring');

const getFileName = (url) => {
  const parts = url.split('/');

  return parts[parts.length - 2];
};

const getSharedPublicUrlCommand = (args) => {
  const host = 'https://slack.com';
  const command = 'files.sharedPublicURL';

  return `${host}/api/${command}?${querystring.stringify(args)}`;
};

const getPublicUrl = (privateUrl, token) => {
  const options = { token, file: getFileName(privateUrl) };

  return new Promise( (resolve) => {
    https.get(getSharedPublicUrlCommand(options), (response) => {
      response.setEncoding('utf8');
      response.on('data', (data) => {
        const json = JSON.parse(data);

        if (json.ok) {
          return resolve(json.file['permalink_public']);
        } else {
          console.error(json.error);

          return resolve('');
        }
      });
    });
  });
};

module.exports = getPublicUrl;
