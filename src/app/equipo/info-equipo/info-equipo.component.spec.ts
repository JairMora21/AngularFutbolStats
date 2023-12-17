import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEquipoComponent } from './info-equipo.component';

describe('InfoEquipoComponent', () => {
  let component: InfoEquipoComponent;
  let fixture: ComponentFixture<InfoEquipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEquipoComponent]
    });
    fixture = TestBed.createComponent(InfoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
