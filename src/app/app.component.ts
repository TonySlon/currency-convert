import { Component } from '@angular/core';
import { CurrencyService } from './currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currencies: any = {};
  currencyCodes: { id: string; name: string }[] = [];
  from: string = 'USD';
  to: string = 'EUR';
  amount: number = 1;
  convertedValue: number | null = null;
  loading = false;

  private PREV_AMNT: number = 1;
  private PREV_FROM: string = '';
  private PREV_TO: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      this.currencyCodes = Object.keys(data).map((key) => {
        return { id: key, name: this.currencies[key]['short_code'] };
      });

      this.onConvert(true);
    });
  }

  onConvert(initial: boolean): void {
    if (!this.amount || this.amount < 1 || !this.from || !this.to) return;
    setTimeout(
      () => {
        // to reduce API calls
        if (this.PREV_FROM != this.from || this.PREV_TO != this.to || this.PREV_AMNT != this.amount) {
          this.PREV_FROM = this.from;
          this.PREV_TO = this.to;
          this.PREV_AMNT = this.amount;
          this.loading = true;
          this.currencyService
            .convert(this.from, this.to, this.amount)
            .subscribe((value) => {
              this.convertedValue = value;
              this.loading = false;
            });
        }
      }, initial ? 0 : 700); // better for user expirience
  }
}
