var express = require("express");

var router = express.Router();

var db = require('../models');
// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  db.Burgers.findAll({}).then(function (queryResult) {

    var hbsObject = {
      burgers: queryResult
    };
    res.render("index", hbsObject);
  });
});

router.post("/burgers/create", function(req, res) {
  db.Burgers.create({
    burger_name: req.body.burger_name
  }).then(function(){
    res.redirect("/burgers"); 
  });
});

router.put("/burgers/update/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  db.Burgers.update(
    { devoured: req.body.devour },
    { where: { id: req.params.id } }
  ).then(function () {
    res.redirect("/burgers");
  });
});

// Export routes for server.js to use.
module.exports = router;