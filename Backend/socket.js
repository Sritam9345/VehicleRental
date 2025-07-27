const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const rentalModel = require('./models/rental.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials:"true"
        }
    });
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("join", async (data) => {
            const { userId , userType } = data;

            try {
                if (userType === "user") {
                    await userModel.findByIdAndUpdate(userId, { socketID: socket.id }, { new: true });
                } else if (userType === "rental") {
                    await rentalModel.findByIdAndUpdate(userId, { socketID: socket.id }, { new: true });
                }
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('update-location-user', async (data) => {
            const { userId , location } = data;
            
        

          const response =  await userModel.findByIdAndUpdate(userId, {
                location: {
                   type:"Point",
                   coordinates:[location.coordinates[0],location.coordinates[1]]
                }
            });
            console.log(response);

        });



        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
    console.log("Socket initialized with Socket.IO");
    console.log("Socket initialized");
}

function sendMessageToSocketld(socketId, message) {
    console.log(message.event);
    if (io && io.sockets.sockets.get(socketId)) {
        io.to(socketId).emit(message.event, message.data);
        console.log(`Message sent to ${socketId}`, message);
    } else {
        console.error(`Socket ${socketId} not found`);
    }
    console.log(`Sending message to ${socketId}: ${message}`);
}

module.exports = { initializeSocket, sendMessageToSocketld };
