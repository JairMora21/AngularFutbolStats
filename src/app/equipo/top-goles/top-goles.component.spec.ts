import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGolesComponent } from './top-goles.component';

describe('TopGolesComponent', () => {
  let component: TopGolesComponent;
  let fixture: ComponentFixture<TopGolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopGolesComponent]
    });
    fixture = TestBed.createComponent(TopGolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
