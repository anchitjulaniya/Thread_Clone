const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // lightweight info for chat list
    lastMessage: {
        text: {
            type: String,
            default: "",
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
