const express = require("express");
const dataBase = require("../data/db.js");
const router = express.Router();

//Get all
router.get("/:id", (req, res) => {
  const { id } = req.params;
  dataBase.findPostComments(id)
    .then(comment => {
    if(comment.length){
      res.status(200).json(comment);
    } else {
      res.status(404).json({
        error:"Comments not found"
      })      
    }

    })
     
    .catch(error => {
      res.status(500)
        .json({ error: "No information retrieved." });
    });
});

//Get by an ID
router.get("/:commentId/comment", (req, res) => {
  const { commentId } = req.params;

  if (commentId) {
    dataBase.findCommentById(commentId)
      .then(comment => res.status(200).json(comment))
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

router.post("/", (req,res) => {
  const newComment = req.body;
  dataBase.insertComment(newComment)
    .then(newComment => {
      res.status(200).json(newComment);
  })
    .catch(({ message }) => {
   res.status(500). json({message})
 })

})


module.exports = router;