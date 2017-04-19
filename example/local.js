const api = require('../index');
const args = process.argv.slice(2);
const privateUrlFromCommandLine = args[args.length - 1];

const apiRequest = {
  context: {
    path: '/public-url',
    method: 'GET'
  },
  queryString: {
    url: privateUrlFromCommandLine
  }
};

api.proxyRouter(apiRequest, {
  done: (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data.body);
  }
});
