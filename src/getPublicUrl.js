const axios = require('axios');
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

const getPublicUrl = async (privateUrl, token) => {
  const options = { token, file: getFileName(privateUrl) };
  const response = await axios.get(getSharedPublicUrlCommand(options));

  if (response.data.ok) {
    return response.data.file['permalink_public'];
  } else {
    console.error(response.data.error);

    return '';
  }
};

module.exports = getPublicUrl;
