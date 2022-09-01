import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsumoComponent } from './admin-consumo.component';

describe('AdminConsumoComponent', () => {
  let component: AdminConsumoComponent;
  let fixture: ComponentFixture<AdminConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
