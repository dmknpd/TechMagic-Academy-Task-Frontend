import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DiscountService } from '../../../services/api-service/discount.service';
import { AuthService } from '../../../services/auth.service';
import { Discount } from '../../../types/discount';

@Component({
  selector: 'app-discount-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './discount-list.component.html',
  styleUrl: './discount-list.component.css',
})
export class DiscountListComponent {
  private discount = inject(DiscountService);
  private auth = inject(AuthService);

  userRole = this.auth.getUserRole();

  displayedColumns = ['name', 'value', 'description', 'actions'];

  message = history.state.message;
  globalError = signal<string | null>(null);

  discountsData = signal<Discount[] | null>(null);

  constructor() {
    this.refreshDiscountsData();
    history.replaceState({}, '');
  }

  refreshDiscountsData() {
    this.discount.getAll().subscribe({
      next: (response) => this.discountsData.set(response.data ?? null),
      error: (err) => {
        console.error(err);
        this.discountsData.set(null);
      },
    });
  }

  onDelete(discount: Discount) {
    const discountId = discount._id;
    if (!discountId) return;

    if (!confirm('Are you sure you want to delete this discount?')) return;

    this.discount.delete(discountId).subscribe({
      next: (response) => {
        if (response.success) {
          this.message = response.message;

          const discounts = this.discountsData();
          if (discounts) {
            const updated = discounts.filter((t: Discount) => t._id !== discountId);
            this.discountsData.set(updated);
          }
        }
      },
      error: (err) => {
        console.error('delete error', err);
        if (err.error.message) {
          this.globalError.set(err.error.message);
        }
      },
    });
  }
}
