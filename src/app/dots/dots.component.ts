import {Component} from '@angular/core';
import {CdkDragMove} from '@angular/cdk/drag-drop';
import {WebSocketService} from "../ws.service";

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.css'],
})
export class DotsComponent {

  private _dots: any = {};
  private mouse: any = { move: false };

  private my_dot: any = { id: false };

  constructor(
      private ws: WebSocketService
  ) {
    this.ws.onDotCreate.subscribe((socket) => {
      this.createDot(socket);
      this.createAdd(socket);
    });

    this.ws.onDotsUpdate.subscribe((dots) => {
      this._dots = {};
      Object.keys(dots).forEach(
        dot_key => {
          this.createAdd(dots[dot_key]);
        }
      );

    });

    this.ws.onDotMoves.subscribe((coordinates) => {
      this.moveDot(coordinates);
    });

    setInterval(() => { this.mouse.move = true; }, 0);
  }

  public createDot(socket) {
    this.my_dot = socket;
  }

  public createAdd(socket) {
    this._dots[socket.id] = socket;
  }

  public moveDot(socket) {
    this._dots[socket.id].x = socket.x;
    this._dots[socket.id].y = socket.y;
  }

  get dotsKeys() {
    return Object.keys(this._dots);
  }

  get dots() {
    return this._dots;
  }

  get myDotId() {
    return this.my_dot.id;
  }

  drag(event: CdkDragMove<string[]>) {
      if ( this.mouse.move ) {
      //    console.log(event.source.element.nativeElement.getBoundingClientRect());
          this.ws.dotMoves({
              x:event.source.element.nativeElement.getBoundingClientRect().left,
              y:event.source.element.nativeElement.getBoundingClientRect().top
          });
          this.mouse.move = false;
      }
  }
}
