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

function publicEdit(id, title, description, importance, dueDate, callback) {
  "use strict";
  var note = new Note(title, description, importance, dueDate);
  db.update({id:id}, {$set:note}, () => {
    if(typeof callback === "function"){
      callback();
    }
  });
}

function publicGet(id, callback) {
  "use strict";
  db.findOne({_id:id}, (err, doc) => {
    if(typeof callback === "function"){
      callback(err, doc);
    }
  });
}

function publicGetAll() {
  "use strict";
  db.find({}, (err, doc) => {
    if(typeof callback === "function"){
      callback(err, doc);
    }
  });
}


module.exports = {add: publicAdd, edit: publicEdit, get:publicGet, all:publicGetAll}