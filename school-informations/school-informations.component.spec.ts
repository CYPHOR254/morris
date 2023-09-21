import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInformationsComponent } from './school-informations.component';

describe('SchoolInformationsComponent', () => {
  let component: SchoolInformationsComponent;
  let fixture: ComponentFixture<SchoolInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
