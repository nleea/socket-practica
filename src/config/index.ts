import express, { Application, Request, Response } from "express";
import { Server } from 'socket.io';
import { resolve, join } from "path";
import { sockets } from "../socket/index";
import cors from "cors";
import engine from "consolidate";
const eiows = require('eiows');

export class Index {
    app: Application;
    io: Server;
    constructor() {
        this.app = express();
        this.middleware();
        this.io = new Server(this.listen(), { wsEngine: eiows.Server });
        this.appSockets()
        // this.route();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.set('views', resolve('src/public'));
        this.app.engine('html', engine.hogan);
        this.app.set('view engine', 'html');
        this.app.use(express.static(join(__dirname, '../public')));

    }

    route() {
        // this.app.use('/', (req: Request, res: Response) => {
        //     res.render('index.html');
        // });
    }

    appSockets() {
        sockets(this.io);
    }

    listen() {
        return this.app.listen(4000, () => {
            console.log('this app is running in port 4000')
        });
    }
}