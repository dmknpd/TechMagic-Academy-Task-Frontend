import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading = signal<boolean>(false);

  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }

  getLoading() {
    return this.loading;
  }
}
