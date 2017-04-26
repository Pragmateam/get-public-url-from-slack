# get-public-url-from-slack

<p align="center">
  <img src="https://img.shields.io/travis/Pragmateam/get-public-url-from-slack.svg" alt="travis">
  <img src="https://img.shields.io/github/license/Pragmateam/get-public-url-from-slack.svg" alt="license">
  <img src="https://img.shields.io/codeclimate/github/Pragmateam/get-public-url-from-slack.svg" alt="codeclimate score">
</p>

Given a private url from slack, this code will return it's public link.

More about Slack Shared Public Url API [here](https://api.slack.com/methods/files.sharedPublicURL)

### Setup

```
$ make install
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
$ make run url={PRIVATE_URL}
```

### Testing

```
$ make test
```

### Deploy to AWS Lambda + API Gateway

Assuming you have your AWS credentials [in
place](https://www.terraform.io/intro/getting-started/build.html) you can just
call `make deploy` as follows:

```
$ make deploy
```

### Contributing

There are many ways to contribute, such as fixing opened issues, creating them
or suggesting new ideas.
Either way will be very appreciated.

### License

get-public-url-from-slack is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
