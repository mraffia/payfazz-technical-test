'use strict';

const assert = require('assert');
const app = require('../server');
const request = require('supertest');

// Test: available data (create dummy data in database first!)
describe('GET /api/kurs/USD?startdate=1111-11-11&enddate=1111-11-11 (valid)', function () {
  it('should respond with JSON object containing the first Kurs data', function () {
    return request(app)
      .get('/api/kurs/USD?startdate=1111-11-11&enddate=1111-11-11')
      .expect(200)
      .then(res => {
        assert.ok(res.body[0].symbol === "USD");
        assert.ok(res.body[0].erate_jual === "1");
        assert.ok(res.body[0].erate_beli === "1");
        assert.ok(res.body[0].ttcounter_jual === "1");
        assert.ok(res.body[0].ttcounter_beli === "1");
        assert.ok(res.body[0].banknotes_jual === "1");
        assert.ok(res.body[0].banknotes_beli === "1");
        assert.ok(res.body[0].date === "1111-11-11");
      });
  });
});

// Test: data not available in the database
describe('GET /api/kurs/USD?startdate=1111-11-12&enddate=1111-11-12 (not available)', function () {
  it('should respond with empty JSON object', function () {
    return request(app)
      .get('/api/kurs/USD?startdate=1111-11-12&enddate=1111-11-12')
      .expect(200)
      .then(res => {
        assert.ok(res.body.length === 0);
      });
  });
});

// Test: invalid request format
describe('GET /api/kurs/$$$?startdate=asd&enddate=asd (invalid format)', function () {
  it('should respond with empty JSON object', function () {
    return request(app)
      .get('/api/kurs/$$$?startdate=asd&enddate=asd')
      .expect(200)
      .then(res => {
        assert.ok(res.body.length === 0);
      });
  });
});
