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
            methods: ["GET", "POST"]
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

        // socket.on('updateLocationRental', async (data) => {
        //     const { rentalId, location } = data;
        //     console.log(data);
        //     if (!location || !location.ltd || !location.lng) {
        //         socket.emit("error", { message: "Invalid Location!",
        //             data:data
        //          });
        //         return;
        //     }

        //     await rentalModel.findByIdAndUpdate(rentalId, {
        //         location: {
        //             ltd: location.ltd,
        //             lng: location.lng
        //         }
        //     });
        // });
      
        socket.on('updateLocationUser', async (data) => {
            const { userId , location } = data;

            if (!location || !location.ltd || !location.lng) {
                socket.emit("error", { message: "Invalid Location!" });
                return;
            }

            await rentalModel.findByIdAndUpdate(rentalId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
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
