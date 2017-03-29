const expect = require('chai').expect;
const nock = require('nock');

const getPublicUrl = require('../src/getPublicUrl');

describe('getPublicUrl', () => {
  const token = 'xxxx-xxxxxxxxx-xxxx';
  const file = 'F1234567890';
  const privateURL = `https://slack.com/files/${file}/image.jpg`;

  it('returns public url', async () => {
    const response = nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        "ok": true,
        "file": {
          "permalink_public": "https:slack-files.com/T024BE7LD-F024BERPE-8004f909b1"
        }
      });

    const publicUrl = await getPublicUrl(privateURL, { token, file });

    expect(publicUrl).to.eql('https:slack-files.com/T024BE7LD-F024BERPE-8004f909b1');
  });

  it('returns empty when file not found', async () => {
    const response = nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        "ok": false,
        "error": "file_not_found"
      });

    const publicUrl = await getPublicUrl(privateURL, { token, file });

    expect(publicUrl).to.eql('');
  });

  it('returns empty when token is invalid', async () => {
    const token = 'invalid token';

    const response = nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        "ok": false,
        "error": "invalid_auth"
      });

    const publicUrl = await getPublicUrl(privateURL, { token, file });

    expect(publicUrl).to.eql('');
  });

  it('returns empty when token is absent', async () => {
    const token = '';

    const response = nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        "ok": false,
        "error": "invalid_auth"
      });

    const publicUrl = await getPublicUrl(privateURL, { token, file });

    expect(publicUrl).to.eql('');
  });
});
