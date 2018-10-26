import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private socket;
    private url: string = 'ws://localhost:4000';
    private reconnectionAttempts: number = 1000;

    private _onCreateDot = new Subject<any>();
    public   onCreateDot = this._onCreateDot.asObservable();

    private _onCoordinates = new Subject<any>();
    public   onCoordinates = this._onCoordinates.asObservable();

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

        this.socket.on('create.dot', (socket) => {
            console.log('create.dot received', socket);
            this._onCreateDot.next(socket);
        });

        this.socket.on('user.coordinates', (coordinates) => {
            console.log('user.coordinates received', coordinates);
            this._onCoordinates.next(coordinates);
        });
    }

    public emit(event, message) {
        if (this.socket) {
            this.socket.emit(event, message);
        }
    }
}
