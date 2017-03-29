# get-public-url-from-slack

Given a private url from slack, this code will return it's public link.

More info [here](https://api.slack.com/methods/files.sharedPublicURL)

## Setup

```
$ npm install
```

## Running

1. Set your Slack application token as an environment variable (e.g. TOKEN=foo)
2. Run the command below passing as argument the private url from Slack

```
$ npm start https://pragmateam.slack.com/files/alabeduarte/F4RT14PC6/test.png
```

## Testing

```
$ npm test
```
