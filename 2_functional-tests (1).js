/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isString(res.text);
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({
            title: "test"
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
      });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({
          title: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });
      
    });
    


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });      
      
    });
  });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/test')
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });
    });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/1')
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });
      
    });
  });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .post('/api/books/1')
        .send({
          comment: "test"
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });
    });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .post('/api/books/1')
        .send({
          comment: ''
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });
    });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .post('/api/books/test')
        .send({
          comment: "test"
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .delete('/api/books/1')
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
        .delete('/api/books/test')
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
      });

    });

  });

});
});
});
});
});