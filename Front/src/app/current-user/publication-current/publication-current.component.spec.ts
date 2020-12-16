import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationCurrentComponent } from './publication-current.component';

describe('PublicationCurrentComponent', () => {
  let component: PublicationCurrentComponent;
  let fixture: ComponentFixture<PublicationCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
