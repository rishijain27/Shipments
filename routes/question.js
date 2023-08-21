const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Question = mongoose.model("Question");
const router = express.Router();

router.get("/allquestions", requireLogin, (req, res, next) => {
  Question.find()
    .populate("postedBy", "_id name ")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((questions) => {
      res.json({ questions: questions });
    });
});

router.post("/createquestion", requireLogin, (req, res, next) => {
  const { body } = req.body;
  if (!body) {
    return res.status(422).json({ error: "Please enter the Question" });
  }
  req.user.password = undefined;
  const question = new Question({
    body,
    postedBy: req.user,
  });
  question
    .save()
    .then((result) => {
      res.json({ question: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myquestion", requireLogin, (req, res, next) => {
  Question.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myquestions) => {
      res.json({ myquestions: myquestions });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/upvote/:questionId", requireLogin, (req, res) => {
  Question.findByIdAndUpdate(
    req.params.questionId,
    {
      $push: { votes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      return res.json(result);
    }
  });
});

router.put("/downvote/:questionId", requireLogin, (req, res) => {
  Question.findByIdAndUpdate(
    req.body.questionId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      return res.json(result);
    }
  });
});

router.put("/comment/:questionId", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Question.findByIdAndUpdate(
    req.params.questionId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
});

router.delete("/deleteQuestion/:questionId", requireLogin, (req, res) => {
  console.log(req.params.questionId);
  Question.findOne({ _id: req.params.questionId })
    .populate("postedBy", "_id")
    .exec((err, question) => {
      if (err || !question) {
        return res.status(422).json({ error: err });
      }
      if (req.user._id.toString() === question.postedBy._id.toString()) {
        question
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
