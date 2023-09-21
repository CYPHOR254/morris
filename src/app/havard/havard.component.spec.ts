import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HavardComponent } from './havard.component';

describe('HavardComponent', () => {
  let component: HavardComponent;
  let fixture: ComponentFixture<HavardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HavardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HavardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
