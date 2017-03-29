const axios = require('axios');
const querystring = require('querystring');

const getSharedPublicUrlCommand = (args) => {
  const host = 'https://slack.com';
  const command = 'files.sharedPublicURL';

  return `${host}/api/${command}?${querystring.stringify(args)}`;
};

const getPublicUrl = async (privateUrl, options) => {
  const response = await axios.get(getSharedPublicUrlCommand(options));

  if (!response.data.ok) return '';

  return response.data.file['permalink_public'];
};

module.exports = getPublicUrl;
