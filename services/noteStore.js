var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes', autoload:true});

function Note(title, description, importance, dueDate){
  "use strict";
  this.title = title;
  this.description = description;
  this.importance = importance;
  this.dueDate = dueDate;
  this.finished = false;
}

function publicAdd(title, description, importance, dueDate, callback) {
  "use strict";
  var note = new Note(title, description, importance, dueDate);
  db.insert(note, (err, newDoc) => {
    if(typeof callback === "function"){
      callback(err, newDoc);
    }
  });
}

function publicEdit() {
  // TODO implement publicEdit
}

function publicGet() {
  // TODO implement publicGet
}

function publicGetAll() {
  // TODO implement publicGetAll
}


module.exports = {add: publicAdd, edit: publicEdit, get:publicGet, all:publicGetAll}