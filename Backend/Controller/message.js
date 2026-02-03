const Message = require('../Model/message');
const Conversation = require('../Model/conversation');
const {StatusCodes} = require('http-status-codes');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const sendMessage = async (req, res) => {
    const {conversationId, text} = req.body;
    const userId = req.user._id;
    console.log("text & ConversationId", text, conversationId);
    console.log("userId", userId);
    try{

        let fileData = null;
        if(req.file){
            const uploadFile = await cloudinary.uploader.upload(req.file.path, {
                folder:'chat-files',
                resource_type: "auto"
            });
            fileData = {
                url:req.file.url,
                name: req.file.originalName,
                type: req.file.mimetype,
                size: req.file.size
            }

            fs.unlinkSync(req.file.path);
        }
        const message = await Message.create({
            conversationId,
            sender: userId,
            text: text || '',
            file:fileData,
            delivered:false,
            seen:false
        })

        console.log("Message created: " , message);

    const conversation = await Conversation.findByIdAndUpdate(
        {_id:conversationId}, 
        {lastMessage:{
                        text: text || '📂 File',
                        sender:userId,
                        seen:false
                     }},
        {new:true});
    console.log("conversation", conversation);
    

    res.status(StatusCodes.OK).json({
        sucess:true,
        message:"Messaged",
        data: message
    })

    }catch(error){
        console.log(error);
        console.error(error);
    }
}



const createConversation = async (req, res) => {
  try {
    const receiverId = req.body.receiverId;
    const senderId = req.user._id;

    // check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {sendMessage, createConversation};
