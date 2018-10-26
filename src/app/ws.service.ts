import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private socket;
    private url: string = 'ws://ws.pitupitu.ovh';
    private reconnectionAttempts: number = 1000;

    private _onDotCreate = new Subject<any>();
    public   onDotCreate = this._onDotCreate.asObservable();

    private _onDotsUpdate = new Subject<any>();
    public   onDotsUpdate = this._onDotsUpdate.asObservable();

    private _onDotMoves = new Subject<any>();
    public   onDotMoves = this._onDotMoves.asObservable();

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

      this.socket.on('dot.create', (socket) => {
  //      console.log('dot.create received', socket);
        this._onDotCreate.next(socket);
      });

      this.socket.on('dots.update', (dots) => {
   //     console.log('dots.update received', dots);
        this._onDotsUpdate.next(dots);
      });

      this.socket.on('dot.moves', (socket) => {
   //     console.log('dot.moves received', socket);
        this._onDotMoves.next(socket);
      });
    }

    public dotMoves(message) {
        if (this.socket) {
            this.socket.emit('dot.moves', message);
        }
    }
}
