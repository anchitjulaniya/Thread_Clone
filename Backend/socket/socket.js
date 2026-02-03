const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io');

const io = new Server(server);

const userSocketMap = {};

io.on('connection', (socket)=>{
    console.log("user connected",socket.id);
    const userId = socket.handshake.query.userId;

    if(!userId){
        console.log("UserId is undefined in socket.handshake.query.userId");
    }
    if(userid !== 'undefined') userSocketMap[userId] = socket.id;

    




})



module.exports = {app, io, server};