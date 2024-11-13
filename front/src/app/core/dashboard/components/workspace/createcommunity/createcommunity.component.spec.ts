import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecommunityComponent } from './createcommunity.component';

describe('CreatecommunityComponent', () => {
  let component: CreatecommunityComponent;
  let fixture: ComponentFixture<CreatecommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecommunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
