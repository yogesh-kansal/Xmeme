const socketIo = require("socket.io");
var Memes = require('../models/meme');
const config = require('./config');

exports.setUp =(server) => {
    const io = socketIo(server, {
        cors: {
          origin: config.clientUrl
        }
      });


    io.on("connection",(socket) => {
        console.log("connected to user",socket.id);

        socket.on('post',() =>{
            console.log('something modidifed!!!');

            Memes.find()
            .then(data => {
                socket.broadcast.emit('modified',{data,err:null})
            })
            .catch(err=> {
                socket.broadcast.emit('modified',{data:null,err});
            })
        })

        socket.on("disconnect",() =>{
            console.log("user disconnected!!!");
        })
    })
}
