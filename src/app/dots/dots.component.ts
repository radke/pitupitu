import {Component} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {WebSocketService} from "../ws.service";

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.css'],
})
export class DotsComponent {

  private _dots: any = {};
  private mouse: any = { move: false };

  constructor(
      private ws: WebSocketService
  ) {
      this.ws.onCreateDot.subscribe((socket) => {
          this.createDot(socket);
      });

      this.ws.onCoordinates.subscribe((coordinates) => {
          this.moveDot(coordinates);
      });

      setInterval(() => { this.mouse.move = true; }, 250);
  }

    public createDot(socket) {
        this._dots[socket.id] = socket;
    }

    public moveDot(coordinates) {
        this._dots[coordinates.id].x = coordinates.x;
        this._dots[coordinates.id].y = coordinates.y;
    }

  get dotsKeys() {
    return Object.keys(this._dots);
  }

  get dots() {
    return this._dots;
  }

  drag(event: CdkDragDrop<string[]>) {
      if ( this.mouse.move ) {
          this.ws.emit('user.coordinates', event);
          this.mouse.move = false;
      }
  }
}
