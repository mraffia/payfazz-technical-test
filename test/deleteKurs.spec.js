'use strict';

const assert = require('assert');
const app = require('../server');
const request = require('supertest');

// Test: available data (create dummy data in database first!)
describe('GET /api/kurs/1111-11-10 (available)', function () {
  it('should respond with 1', function () {
    return request(app)
      .delete('/api/kurs/1111-11-10')
      .expect(202)
      .then(res => {
        assert.ok(res.body === 1);
      });
  });
});

// Test: data not available in the database
describe('GET /api/kurs/1111-11-12 (not available)', function () {
  it('should respond with 0', function () {
    return request(app)
      .delete('/api/kurs/1111-11-12')
      .expect(202)
      .then(res => {
        assert.ok(res.body === 0);
      });
  });
});

// Test: invalid request format
describe('GET /api/kurs/asd (invalid format)', function () {
  it('should respond with 0', function () {
    return request(app)
      .delete('/api/kurs/asd')
      .expect(202)
      .then(res => {
        assert.ok(res.body === 0);
      });
  });
});
