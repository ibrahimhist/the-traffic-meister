import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { LoadingService } from './loading.service';
import { MessageHandlingService } from './message-handling.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    protected messageHandlingService: MessageHandlingService,
    protected loadingService: LoadingService
  ) {}

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageHandlingService.showErrorMessage(
        `${operation} failed: ${error.message}`
      );
      this.loadingService.hideLoading();
      return of(result as T);
    };
  }
}
