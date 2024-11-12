import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPswd2Component } from './reset-pswd2.component';

describe('ResetPswd2Component', () => {
  let component: ResetPswd2Component;
  let fixture: ComponentFixture<ResetPswd2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPswd2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPswd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
