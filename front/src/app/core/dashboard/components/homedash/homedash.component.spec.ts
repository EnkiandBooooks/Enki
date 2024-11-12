import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedashComponent } from './homedash.component';

describe('HomedashComponent', () => {
  let component: HomedashComponent;
  let fixture: ComponentFixture<HomedashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomedashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
