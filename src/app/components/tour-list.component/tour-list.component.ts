import { Component } from '@angular/core';

@Component({
  selector: 'app-tour-list.component',
  imports: [],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css',
})
export class TourListComponent {
  msg = history.state.msg;

  constructor() {
    history.replaceState({}, '');
  }
}
