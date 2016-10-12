var Datastore = require('nedb');
var db = new Datastore({filename: './data/notes', autoload: true});

function Note(title, description, importance, dueDate, finished) {
  "use strict";
  this.title = title;
  this.description = description;
  this.importance = importance;
  this.dueDate = new Date(dueDate);
  this.finished = !!finished;
  this.createDate = new Date();
}

function publicAdd(title, description, importance, dueDate, finished, callback) {
  "use strict";
  var note = new Note(title, description, importance, dueDate, finished);
  db.insert(note, (err, newDoc) => {
    if (typeof callback === "function") {
      callback(err, newDoc);
    }
  });
}

function publicEdit(id, title, description, importance, dueDate, finished, callback) {
  "use strict";
  db.update({_id: id}, {
      $set: {
        title: title,
        description: description,
        importance: importance,
        dueDate: new Date(dueDate),
        finished: finished
      }
    },
    () => {
      if (typeof callback === "function") {
        callback();
      }
    });
}

function publicGet(id, callback) {
  "use strict";
  db.findOne({_id: id}, (err, doc) => {
    if (typeof callback === "function") {
      callback(err, doc);
    }
  });
}

function publicGetAll() {
  "use strict";
  db.find({}, (err, doc) => {
    if (typeof callback === "function") {
      callback(err, doc);
    }
  });
}


module.exports = {add: publicAdd, edit: publicEdit, get: publicGet, all: publicGetAll}