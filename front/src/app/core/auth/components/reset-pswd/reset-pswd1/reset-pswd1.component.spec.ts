import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPswd1Component } from './reset-pswd1.component';

describe('ResetPswd1Component', () => {
  let component: ResetPswd1Component;
  let fixture: ComponentFixture<ResetPswd1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPswd1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPswd1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
