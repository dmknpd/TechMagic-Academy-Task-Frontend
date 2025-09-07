import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Discount, DiscountFormData } from '../../types/discount';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DiscountService extends ApiService<Discount, DiscountFormData> {
  protected override baseUrl = `${environment.backendHost}/api/discounts`;
}
