import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryListItemComponent } from './itinerary-list-item.component';

describe('ItineraryListItemComponent', () => {
  let component: ItineraryListItemComponent;
  let fixture: ComponentFixture<ItineraryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
