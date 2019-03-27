'use strict';

const assert = require('assert');
const app = require('../server');
const request = require('supertest');

// Test: data already available in the database
describe('PUT /api/kurs (already available)', function () {
  it('should respond with JSON object containing the data of the updated Kurs and "Kurs has been successfully updated" message', function () {
    return request(app)
      .put('/api/kurs')
      .expect(202)
      .send(
        {
          "symbol": "BBB",
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
          "date": "2018-05-17"
      })
      .then(res => {
        assert.ok(res.body[1] === "Kurs has been successfully updated");
      });
  });
});

// Test: data not available in the database
describe('PUT /api/kurs (not available)', function () {
  it('should respond with "Data not found" message', function () {
    return request(app)
      .put('/api/kurs')
      .expect(404)
      .then(res => {
        assert.ok(res.body === "Data not found");
      });
  });
});
