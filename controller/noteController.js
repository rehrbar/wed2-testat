var store = require("../services/noteStore.js");

module.exports.showIndex = function(req, res) {
  "use strict";
  // TODO add filter
  var showFinished = typeof req.query.show_finished !== "undefined";
  store.all(showFinished, (notes)=>{

    var orderBy = req.query.sort;
    // TODO test sorting
    notes.sort((a, b) =>{
      switch(orderBy){
        case "createDate":
          return compareValues(a, b, "createDate");
          break;
        case "createDate_desc":
          return compareValues(a, b, "createDate") * -1;
          break;
        case "dueDate":
          return compareValues(a, b, "dueDate");
          break;
        case "dueDate_desc":
          return compareValues(a, b, "dueDate") * -1;
          break;
        case "importance":
          return compareValues(a, b, "importance");
          break;
        case "importance_desc":
          return compareValues(a, b, "importance") * -1;
          break;
        default:
          return 0;
      }
    });
    res.render('index', { title: 'Express', notes: notes, orderBy: orderBy });
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