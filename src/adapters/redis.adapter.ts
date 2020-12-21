import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
// import redisIoAdapter from 'socket.io-redis';

// import { Server } from 'socket.io';
// import { createAdapter } from 'socket.io-redis';
// import { RedisClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
    createIOServer(IoPort: number): any {
        const server = super.createIOServer(IoPort);
        const redisAdapter = redisIoAdapter(
            {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT)
            });
        server.adapter(redisAdapter);
        return server;
        // const io = new Server(IoPort);
        // const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
        // const subClient = pubClient.duplicate();

        // io.adapter(createAdapter({ pubClient, subClient }));
        // return io;
    }
}