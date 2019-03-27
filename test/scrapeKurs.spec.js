'use strict';

const assert = require('assert');
const app = require('../server');
const request = require('supertest');

// Test: scraping success
describe('GET /api/indexing', function () {
  it('should respond with "Scraping berhasil. Apabila Kurs tanggal (current date) telah tersimpan di database sebelumnya, maka data tidak akan ditambahkan." message', function () {
    return request(app)
      .get('/api/indexing')
      .expect(200)
      .then(res => {
        assert.ok(res.body.length > 0);
      });
  });
});
