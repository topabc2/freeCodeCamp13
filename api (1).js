/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  const bodyParser = require("body-parser");
  let data = [];
  let _id = 0;

  app.use(bodyParser());

  app.route('/api/books')
    .get(function (req, res){
      let result = [];
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      data.forEach((item, index) => {
        if(!item.title) {
          item.title = '';
        }
        result.push({ _id: item._id, title: item.title, commentcount: item.commentcount });
      });
      
      res.json(result);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if(!title) {
        res.send("missing required field title");
      }

      _id++;
      data.push({ title: title, _id: _id.toString(), commentcount: 0, comments: [] });
      res.json(data[data.length - 1]);
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      data = [];
      res.send("complete delete successful");
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      data.forEach((item, index) => {
        if(item._id === bookid) {
          res.json({ _id: bookid, title: item.title, comments: item.comments });
        }
      });
      
      res.send("no book exists");
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      data.forEach((item, index) => {
        if(item._id === bookid) {
          if(!comment) {
            res.send("missing required field comment");
          } else {
            item.comments.push(comment);
            item.commentcount++;
            res.json({ _id: bookid, title: item.title, comments: item.comments });
          }
        }
      });
      
      res.send("no book exists");
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      data.forEach((item, index) => {
        if(item._id === bookid) {
          data.splice(index, 1);
          res.send("delete successful");
        }
      });
      
      res.send("no book exists");
    });
  
};
