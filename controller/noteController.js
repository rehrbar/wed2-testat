var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res) {
  // TODO add filter
  res.render('index', { title: 'Express', notes: store.all() });
};

module.exports.add = function(req, res) {
  store.add(
    req.body.title,
    req.body.description,
    req.body.importance,
    req.body.dueDate,
    req.body.finished,
    () => res.redirect("/")
  );
};

module.exports.addForm = function(req, res) {
  // TODO implement addForm method
  res.render("edit", {title:"New Note", action:"/notes"});
};

module.exports.editForm = function(req, res) {
  // TODO implement editForm method
  store.get(req.params.id, (err, note) => {
    "use strict";
    res.render("edit", { title: "Edit Note", action:"/notes/"+req.params.id, note: note});
  });
};

module.exports.edit = function(req, res) {
  store.edit(
    req.params.id,
    req.body.title,
    req.body.description,
    req.body.importance,
    req.body.dueDate,
    req.body.finished,
    () => res.redirect("/")
  );
};
