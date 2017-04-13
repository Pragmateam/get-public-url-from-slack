const expect = require('chai').expect;
const nock = require('nock');

const getPublicUrl = require('../src/getPublicUrl');

describe('getPublicUrl', () => {
  const token = 'xxxx-xxxxxxxxx-xxxx';
  const file = 'F1234567890';
  const privateURL = `https://slack.com/files/${file}/image.jpg`;

  it('returns public url', (done) => {
    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        ok: true,
        file: {
          permalink_public: 'https:slack-files.com/T024BE7LD-F024BERPE-8004f909b1',
        },
      });

    getPublicUrl(privateURL, token).then((publicUrl) => {
      expect(publicUrl).to.eql('https:slack-files.com/T024BE7LD-F024BERPE-8004f909b1');

      done();
    }).catch(err => done(err));
  });

  it('returns empty when file not found', (done) => {
    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token, file })
      .reply(200, {
        ok: false,
        error: 'file_not_found',
      });

    getPublicUrl(privateURL, token).then((publicUrl) => {
      expect(publicUrl).to.eql('');

      done();
    }).catch(err => done(err));
  });

  it('returns empty when token is invalid', (done) => {
    const invalidToken = 'invalid token';

    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token: invalidToken, file })
      .reply(200, {
        ok: false,
        error: 'invalid_auth',
      });

    getPublicUrl(privateURL, invalidToken).then((publicUrl) => {
      expect(publicUrl).to.eql('');

      done();
    }).catch(err => done(err));
  });

  it('returns empty when token is absent', (done) => {
    const emptyToken = '';

    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token: emptyToken, file })
      .reply(200, {
        ok: false,
        error: 'invalid_auth',
      });

    getPublicUrl(privateURL, emptyToken).then((publicUrl) => {
      expect(publicUrl).to.eql('');

      done();
    }).catch(err => done(err));
  });

  it('returns error message when something bad happens with slack API request', (done) => {
    const emptyToken = '';

    nock('https://slack.com')
      .get('/api/files.sharedPublicURL')
      .query({ token: emptyToken, file })
      .replyWithError({ ok: false, error: 'Internal Server Error' });

    getPublicUrl(privateURL, emptyToken).then((publicUrl) => {
      expect(publicUrl).to.eql({ ok: false, error: 'Internal Server Error' });

      done();
    }).catch(err => done(err));
  });
});
