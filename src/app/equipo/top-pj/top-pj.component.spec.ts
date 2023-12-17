import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPJComponent } from './top-pj.component';

describe('TopPJComponent', () => {
  let component: TopPJComponent;
  let fixture: ComponentFixture<TopPJComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPJComponent]
    });
    fixture = TestBed.createComponent(TopPJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
