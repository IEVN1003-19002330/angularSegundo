import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResistenciasComponent } from './resistencias.component';

describe('ResistenciasComponent', () => {
  let component: ResistenciasComponent;
  let fixture: ComponentFixture<ResistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResistenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
