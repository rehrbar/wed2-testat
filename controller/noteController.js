var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res) {
  "use strict";
  var showFinished = req.query.show_finished === "true";
  var orderBy = req.query.sort;

  store.all(showFinished, (notes)=>{

    notes.sort((a, b) =>{
      switch(orderBy){
        case "createDate":
          return compareValues(a, b, "createDate");
        case "createDate_desc":
          return compareValues(a, b, "createDate") * -1;
        case "dueDate":
          return compareValues(a, b, "dueDate");
        case "dueDate_desc":
          return compareValues(a, b, "dueDate") * -1;
        case "importance":
          return compareValues(a, b, "importance");
        case "importance_desc":
          return compareValues(a, b, "importance") * -1;
        default:
          return 0;
      }
    });
    res.render('index', { title: 'Express', notes: notes, orderBy: orderBy, finished: showFinished });
  });
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

function compareValues(a, b, propertyName){
  "use strict";

  return a[propertyName] === b[propertyName] ? 0 : ((a[propertyName] < b[propertyName])? -1:1);
}