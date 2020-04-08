process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app.js');
const conn = require('../db/index.js');

describe('POST /results', () => {

  before((done) => {
    conn.connect().then(() => done()).catch(err => done(err));
  })

  after((done) => {
    conn.close().then(() => done()).catch(err => done(err));
  })

  it('TC511-P, Insert a new PR document.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Miami, FL",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(res.statusCode).to.equal(200);
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('company_id');
      expect(body).to.contain.property('location');
      expect(body).to.contain.property('date_time');
      expect(body).to.contain.property('num_bad');
      expect(body).to.contain.property('num_neutral');
      expect(body).to.contain.property('num_good');
      expect(body).to.contain.property('retweet_count');
      expect(body).to.contain.property('favorite_count');
      expect(body).to.contain.property('replies_count');
      done();
    })
    .catch(err => done(err));
  });

  it('TC511-F, Insert a new PR document. Empty Company ID.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "",
      "location": "Miami, FL",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("company_id missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Company ID.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": null,
      "location": "Miami, FL",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("company_id missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Location.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("location missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Location.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": null,
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("location missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Date Time.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "",
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("date_time missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Date Time.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": null,
      "num_bad": "1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("date_time missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Num Bad.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("num_bad missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Num Bad.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": null,
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("num_bad missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Num Bad Outer Lower Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "-1",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("num_bad is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Num Bad Outer Upper Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "5000001",
      "num_neutral": "2",
      "num_good": "0",
      "retweet_count": "47",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("num_bad is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Num Neutral.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "",
      "num_good": "5",
      "retweet_count": "50",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("num_neutral missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Num Neutral.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": null,
      "num_good": "5",
      "retweet_count": "50",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("num_neutral missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Num Neutral Outer Lower Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "-1",
      "num_good": "5",
      "retweet_count": "50",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("num_neutral is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Num Neutral Outer Upper Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "5000001",
      "num_good": "5",
      "retweet_count": "50",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("num_neutral is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Num Good.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "",
      "retweet_count": "36",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("num_good missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Num Good.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": null,
      "retweet_count": "36",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("num_good missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Num Good Outer Lower Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "-1",
      "retweet_count": "36",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("num_good is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Num Good Outer Upper Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "5000001",
      "retweet_count": "36",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("num_good is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Retweet Count.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("retweet_count missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Retweet Count.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": null,
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("retweet_count missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Retweet Count Outer Lower Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "-1",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("retweet_count is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Retweet Count Outer Upper Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "5000001",
      "favorite_count": "0",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("retweet_count is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Favorite Count.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("favorite_count missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Favorite Count.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": null,
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("favorite_count missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Favorite Count Outer Lower Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "-1",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("favorite_count is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Favorite Count Outer Upper Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "5000001",
      "replies_count": "0"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("favorite_count is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Empty Replies Count.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "63",
      "replies_count": ""
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("replies_count missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Null Replies Count.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "63",
      "replies_count": null
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.key_error).to.equal("replies_count missing value");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Replies Count Outer Lower Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "63",
      "replies_count": "-1"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("replies_count is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('TC511-F, Insert a new PR document. Replies Count Outer Upper Boundary.', (done) => {
    request(app)
    .post("/results")
    .send({
      "company_id": "5dedaabb2eb3bd00460bbacb",
      "location": "Elk River, MN",
      "date_time": "12/09/2019 2:01 AM",
      "num_bad": "56",
      "num_neutral": "2",
      "num_good": "56",
      "retweet_count": "56",
      "favorite_count": "63",
      "replies_count": "5000001"
    })
    .then(res => {
      const body = res.body;
      expect(body.status_code).to.not.equal(200);
      expect(body.boundary_error).to.equal("replies_count is outside the specifed range of values. [0, 5000000]");
      done();
    })
    .catch(err => done(err));
  })

  it('OK, get Pertinent Result by company_id', (done) => {
    request(app).get('/results/5dedaabb2eb3bd00460bbacb')
    .then(res => {
      const expectedResponse = {
        "company_id": "5dedaabb2eb3bd00460bbacb",
        "location": "Miami, FL",
        "date_time": "12/09/2019 2:01 AM",
        "num_bad": "1",
        "num_neutral": "2",
        "num_good": "0",
        "retweet_count": "47",
        "favorite_count": "0",
        "replies_count": "0"
      }
      const body = res.body;
      expect(body[0].company_id).to.equal(expectedResponse.company_id);
      done();
    });
  });

 
});