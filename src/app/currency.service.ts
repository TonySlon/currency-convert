// currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
 
  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<any>(
      `${environment.apiUrl}/currencies?api_key=${environment.apiKey}`
    );
  }

  convert(from: string, to: string, amount: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/convert?api_key=${environment.apiKey}&from=${from}&to=${to}&amount=${amount}`
      )
      .pipe(map((res) => res.value));
  }
}
