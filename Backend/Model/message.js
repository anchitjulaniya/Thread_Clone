const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    // Image (backward compatible)
    image: {
      type: String,
      default: "",
    },

//  File
    file: {
      url: {
        type: String, // cloudinary / s3 url
      },
      name: {
        type: String, // original file name
      },
      type: {
        type: String, // pdf, docx, mp3, mp4, etc.
      },
      size: {
        type: Number, // bytes
      },
    },
    delivered:{
        type:Boolean,
        default: false
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
