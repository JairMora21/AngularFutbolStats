import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTarjetasComponent } from './top-tarjetas.component';

describe('TopTarjetasComponent', () => {
  let component: TopTarjetasComponent;
  let fixture: ComponentFixture<TopTarjetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopTarjetasComponent]
    });
    fixture = TestBed.createComponent(TopTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
