var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res) {
  // TODO add filter
  res.render('index', { title: 'Express', notes: store.all() });
}

module.exports.add = function(req, res) {
  store.add(
    req.body.title,
    req.body.description,
    req.body.importance,
    req.body.dueDate,
    () => res.redirect("/")
  );
}

module.exports.addForm = function(req, res) {
  // TODO implement addForm method
  res.render("edit", {title:"New Note"});
}

module.exports.editForm = function(req, res) {
  // TODO implement editForm method
  res.send('edit form');
}

module.exports.edit = function(req, res) {
  // TODO implement edit method
  res.send('edit method');
}
