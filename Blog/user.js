const express = require("express");
const dataBase = require("../data/db.js");
const router = express.Router();

//Get all
router.get("/:id/comments", (req, res) => {
  dataBase.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "No information retrieved." });
    });
});

//Get by an ID
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  if (id) {
    dataBase.findById(id)
      .then(userId => res.status(200).json(userId))
      .catch(error => {
        error
          .status(500)
          .json({ error: "No information retrieved." });
      });
  } else {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
});



module.exports = router;