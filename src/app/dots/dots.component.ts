import {Component} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {WebSocketService} from "../ws.service";

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.css'],
})
export class DotsComponent {

  private _dots: any = ['raz', 'dwa'];
  private mouse: any = { move: false };

  constructor(
      private ws: WebSocketService
  ) {
    setInterval(() => { this.mouse.move = true; }, 250);
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
