import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMasterComponent } from './admin-master.component';

describe('AdminMasterComponent', () => {
  let component: AdminMasterComponent;
  let fixture: ComponentFixture<AdminMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
