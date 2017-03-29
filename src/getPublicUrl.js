const axios = require('axios');
const querystring = require('querystring');

const getPublicUrl = async (privateUrl, options) => {
  const response = await axios.get(`https://slack.com/api/files.sharedPublicURL?${querystring.stringify(options)}`);

  return response.data.file['permalink_public'];
};

module.exports = getPublicUrl;
