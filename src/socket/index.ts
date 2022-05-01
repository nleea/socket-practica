import { Server } from 'socket.io';

export function sockets(io: Server) {
    io.on('connect', (socket) => {
        // socket.on('message', (data) => {
        //     console.log(data);
        // });
        socket.join(['personal', 'room1']);
        socket.on('change_room', (data) => {
            socket.in(data.id).socketsLeave(data.room);
            socket.join(data.room);
        });
        socket.on('private_message', async (data) => {
            socket.to(data.room).emit('message_private', { message: data.message });
        });
        socket.on('online', async () => {
            const online: string[] = [];
            const sockets_online = await io.sockets.allSockets();
            sockets_online.forEach((c) => {
                online.push(c);
            });
            socket.broadcast.to('personal').emit('show_online', { id: online });
        });

        socket.on('user', (data) => {
            socket.to(data.id).emit('message_private_user', { message: data.message })
        });

        socket.on('nuevo', async (data) => {
            const online: string[] = [];
            const sockets_online = await io.sockets.allSockets();
            sockets_online.forEach((c) => {
                online.push(c);
            });
            socket.emit('actualiza', online)
        });
        // const namespace = io.of('/grupo1');
        // namespace.emit('hello', 'This is the firts namespace');
        // namespace.on('ss', (d) => { console.log(d) });
    });
}