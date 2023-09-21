import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuaiComponent } from './ruai.component';

describe('RuaiComponent', () => {
  let component: RuaiComponent;
  let fixture: ComponentFixture<RuaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
