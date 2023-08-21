const mongoose=require('mongoose')
const User=mongoose.model("User")
const { ObjectId } = mongoose.Schema.Types;
const questionSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  votes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
},{timestamps:true});

mongoose.model("Question", questionSchema);
