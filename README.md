# get-public-url-from-slack

Given a private url from slack, this code will return it's public link.

More about Slack Shared Public Url API [here](https://api.slack.com/methods/files.sharedPublicURL)

## Setup

```
$ npm install
```

### Running

The entry point (index.js) has been optimized to run under aws lambda, but there
are more to come in the future like:

1. Ability to run locally (e.g. [locally](https://github.com/atlassian/localstack))
2. Automatic deploy to AWS Lambda (e.g. [terraform](https://www.terraform.io))
3. Automatic infrastructure setup (e.g. [terraform](https://www.terraform.io))

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
