import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { FindClientComponent } from './find-client.component/find-client.component';
import { CreateClientComponent } from './create-client.component/create-client.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, FindClientComponent, CreateClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {}
