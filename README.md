# get-public-url-from-slack

[![Build
Status](https://travis-ci.org/Pragmateam/get-public-url-from-slack.svg?branch=master)](https://travis-ci.org/Pragmateam/get-public-url-from-slack)

Given a private url from slack, this code will return it's public link.

More about Slack Shared Public Url API [here](https://api.slack.com/methods/files.sharedPublicURL)

## Setup

```
$ npm install
```

### Running

Ensure you have a valid [Slack API
Token](https://api.slack.com/custom-integrations/legacy-tokens) on your environment variable set:

```
export SLACK_API_TOKEN=****-**********-************-************-*************
```

Then follow the steps below:

1. Upload a new image on your slack.
2. Get it's private url (probably with the mouse right button)
3. Run:

```
$ npm start {PRIVATE_URL}
```

The entry point (index.js) has been optimized to run under aws lambda, so there
are more to come in the future like:

1. Automatic deploy to AWS Lambda (e.g. [terraform](https://www.terraform.io))
2. Automatic infrastructure setup (e.g. [terraform](https://www.terraform.io))

### Testing

```
$ npm test
```

### Contributing

There are many ways to contribute, such as fixing opened issues, creating them
or suggesting new ideas.
Either way will be very appreciated.

### License

get-public-url-from-slack is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
