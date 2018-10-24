import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DotsComponent } from './dots.component';

describe('DotsComponent', () => {
  let component: DotsComponent;
  let fixture: ComponentFixture<DotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotsComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
