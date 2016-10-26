var store = require("../services/noteStore.js");
var moment = require("moment");

module.exports.showIndex = function(req, res) {
  "use strict";
  var showFinished = req.query.show_finished === "true";
  var orderBy = req.query.sort;

  setTheme(req, req.query.theme);

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
    res.render('index', { title: 'Notes overview', theme: getTheme(req), notes: notes, orderBy: orderBy, finished: showFinished });
  });
};

module.exports.add = function(req, res) {
  store.add(
    req.body.title,
    req.body.description,
    req.body.importance,
    moment(req.body.dueDate),
    req.body.finished,
    () => res.redirect("/")
  );
};

module.exports.addForm = function(req, res) {
  // TODO implement addForm method
  res.render("edit", {title:"New Note", theme: getTheme(req), action:"/notes"});
};

module.exports.editForm = function(req, res) {
  // TODO implement editForm method
  store.get(req.params.id, (err, note) => {
    "use strict";
    res.render("edit", { title: "Edit Note", theme: getTheme(req), action:"/notes/"+req.params.id, note: note});
  });
};

module.exports.edit = function(req, res) {
  store.edit(
    req.params.id,
    req.body.title,
    req.body.description,
    req.body.importance,
    moment(req.body.dueDate),
    req.body.finished,
    () => res.redirect("/")
  );
};

function compareValues(a, b, propertyName){
  "use strict";

  return a[propertyName] === b[propertyName] ? 0 : ((a[propertyName] < b[propertyName])? -1:1);
}

function getTheme(request){
  "use strict";
  // Use variable to store new set themes.
  return request.session.theme;
}

function setTheme(request, theme){
  "use strict";
  // TODO add some useful options for path and expires
  if (theme){
    if(theme !== "default") {
      request.session.theme = theme;
    } else {
      request.session.theme = "";
    }
  }
}