import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private socket;
    private url: string = 'ws://ws.pitupitu.ovh';
    private reconnectionAttempts: number = 1000;

    constructor() {
        let _query = {
            dane: {
                foo: 'bar',
            }
        };

        let query = JSON.stringify(_query);

        this.init({
            server: this.url,
            reconnectionAttempts: this.reconnectionAttempts,
            query: {
                options: query
            }
        });
    }

    public init(config) {
        this.socket = io(config.server, config);

        this.socket.on('user.coordinates', (coordinates) => {
            console.log('user.coordinates received', coordinates);
        });
    }

    public emit(event, message) {
        if (this.socket) {
            this.socket.emit(event, message);
        }
    }
}
