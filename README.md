# get-public-url-from-slack

Given a private url from slack, this code will return it's public link.

More about Slack Shared Public Url API [here](https://api.slack.com/methods/files.sharedPublicURL)

## Setup

```
$ npm install
```

## Running

The entry point (index.js) is optimized to run under aws lambda, so more to come
in the future like:

1. Ability to run locally
2. Automatic deploy to AWS Lambda
3. Automatic infrastructure setup

## Testing

```
$ npm test
```
