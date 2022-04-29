import { Server } from 'socket.io';

export function sockets(io: Server) {
    io.on('connection', (socket) => {
        // socket.on('message', (data) => {
        //     console.log(data);
        // });
        socket.join('room1');
        socket.on('change_room', (data) => {
            const leaveroom: any[] = [];
            socket.rooms.forEach((r) => {
                leaveroom.push(r);
            });
            socket.leave(leaveroom[1]);
            socket.join(data.room);
        });
        socket.on('private_message', (data) => {
            socket.to(data.room).emit('message_private', { message: data.message });
        });
    });
}