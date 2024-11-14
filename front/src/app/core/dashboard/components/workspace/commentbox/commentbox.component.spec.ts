import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentboxComponent } from './commentbox.component';

describe('CommentboxComponent', () => {
  let component: CommentboxComponent;
  let fixture: ComponentFixture<CommentboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
