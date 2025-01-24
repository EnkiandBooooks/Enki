import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitylistComponent } from './communitylist.component';

describe('CommunitylistComponent', () => {
  let component: CommunitylistComponent;
  let fixture: ComponentFixture<CommunitylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunitylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
