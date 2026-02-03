const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../Model/message");
const Conversation = require("../Model/conversation");

const userSocketMap = {}; // userId -> socketId

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // 🔐 JWT authentication for socket
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.userId = decoded.userid;
      next();
    } catch (err) {
      next(new Error("Socket authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log("🟢 User connected:", userId);

    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Join conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    // Send message (REAL TIME)
    socket.on(
      "sendMessage",
      async ({ conversationId, receiverId, text, file }) => {
        try {
          const message = await Message.create({
            conversationId,
            sender: userId,
            text: text || "",
            file: file || null,
            delivered: false,
            seen: false,
          });

          await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: {
              text: text || "📎 File",
              sender: userId,
              seen: false,
            },
          });

          const receiverSocketId = userSocketMap[receiverId];

          if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);

            await Message.findByIdAndUpdate(message._id, {
              delivered: true,
            });

            io.to(socket.id).emit("messageDelivered", {
              messageId: message._id,
            });
          }

          socket.emit("newMessage", message);
        } catch (error) {
          console.error("sendMessage error:", error);
        }
      }
    );

    // Seen
    socket.on("markMessageSeen", async ({ conversationId }) => {
      await Message.updateMany(
        { conversationId, seen: false, sender: { $ne: userId } },
        { $set: { seen: true } }
      );

      await Conversation.updateOne(
        { _id: conversationId },
        { $set: { "lastMessage.seen": true } }
      );

      socket.to(conversationId).emit("messageSeen", { conversationId });
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      console.log("🔴 User disconnected:", userId);
    });
  });
};

module.exports = initSocket;
