import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovComponent } from './user-mov.component';

describe('UserMovComponent', () => {
  let component: UserMovComponent;
  let fixture: ComponentFixture<UserMovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
