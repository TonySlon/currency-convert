// currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private API_KEY = 'gQAgbl7PuFIf0gVh6cabtbWba2imPKbn'; // Replace with your key
  private BASE_URL = 'https://api.currencybeacon.com/v1';

  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<any>(
      `${this.BASE_URL}/currencies?api_key=${this.API_KEY}`
    );
  }

  convert(from: string, to: string, amount: number) {
    return this.http
      .get<any>(
        `${this.BASE_URL}/convert?api_key=${this.API_KEY}&from=${from}&to=${to}&amount=${amount}`
      )
      .pipe(map((res) => res.value));
  }
}
