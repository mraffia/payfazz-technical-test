'use strict';

const assert = require('assert');
const app = require('../server');
const request = require('supertest');

// Test: data not available in the database
describe('POST /api/kurs (not available)', function () {
  it('should respond with JSON object containing the request Kurs data, created equals true', function () {
    return request(app)
      .post('/api/kurs')
      .expect(200)
      .send(
        {
          "symbol": "AAA",
          "e_rate": {
            "jual": 1803.55,
            "beli": 177355
          },
          "tt_counter": {
            "jual": 1803.55,
            "beli": 177355
          },
          "bank_notes": {
            "jual": 1803.55,
            "beli": 177355
          },
          "date": "2018-05-16"
      })
      .then(res => {
        assert.ok(res.body[0].symbol === "AAA");
        assert.ok(res.body[0].erate_jual === "1803.55");
        assert.ok(res.body[0].erate_beli === "177355");
        assert.ok(res.body[0].ttcounter_jual === "1803.55");
        assert.ok(res.body[0].ttcounter_beli === "177355");
        assert.ok(res.body[0].banknotes_jual === "1803.55");
        assert.ok(res.body[0].banknotes_beli === "177355");
        assert.ok(res.body[0].date === "2018-05-16");
        assert.ok(res.body[1] === true);
      });
  });
});

// Test: data already available in the database
describe('POST /api/kurs (already available)', function () {
  it('should respond with JSON object containing the request Kurs data, created equals false', function () {
    return request(app)
      .post('/api/kurs')
      .expect(200)
      .send(
        {
          "symbol": "AAA",
          "e_rate": {
            "jual": 1803.55,
            "beli": 177355
          },
          "tt_counter": {
            "jual": 1803.55,
            "beli": 177355
          },
          "bank_notes": {
            "jual": 1803.55,
            "beli": 177355
          },
          "date": "2018-05-16"
      })
      .then(res => {
        assert.ok(res.body[1] === false);
      });
  });
});
