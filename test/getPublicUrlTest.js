const expect = require('chai').expect;
const nock = require('nock');

const getPublicUrl = require('../src/getPublicUrl');

describe('getPublicUrl', () => {
  const token = 'xxxx-xxxxxxxxx-xxxx';
  const file = 'F1234567890';
  const privateURL = `https://slack.com/files/${file}/image.jpg`;

  it('returns public url', async () => {
    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        ok: true,
        file: {
          permalink_public: 'https:slack-files.com/T024BE7LD-F024BERPE-8004f909b1',
        },
      });

    const publicUrl = await getPublicUrl(privateURL, token);

    expect(publicUrl).to.eql('https:slack-files.com/T024BE7LD-F024BERPE-8004f909b1');
  });

  it('returns empty when file not found', async () => {
    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        ok: false,
        error: 'file_not_found',
      });

    const publicUrl = await getPublicUrl(privateURL, token);

    expect(publicUrl).to.eql('');
  });

  it('returns empty when token is invalid', async () => {
    const invalidToken = 'invalid token';

    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token: invalidToken, file })
      .reply(200, {
        ok: false,
        error: 'invalid_auth',
      });

    const publicUrl = await getPublicUrl(privateURL, invalidToken);

    expect(publicUrl).to.eql('');
  });

  it('returns empty when token is absent', async () => {
    const emptyToken = '';

    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token: emptyToken, file })
      .reply(200, {
        ok: false,
        error: 'invalid_auth',
      });

    const publicUrl = await getPublicUrl(privateURL, emptyToken);

    expect(publicUrl).to.eql('');
  });

  it('returns error message when something bad happens with slack API request', async () => {
    const emptyToken = '';

    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token: emptyToken, file })
      .replyWithError({ ok: false, error: 'Internal Server Error' });

    const publicUrl = await getPublicUrl(privateURL, emptyToken);

    expect(publicUrl).to.eql({ ok: false, error: 'Internal Server Error' });
  });
});
