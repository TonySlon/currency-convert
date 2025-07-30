import { Component } from '@angular/core';
import { CurrencyService } from './currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputComponent } from './input/input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent, InputComponent],
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

  conversionTrigger = new Subject<{
    from: string;
    to: string;
    amount: number;
  }>();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((data) => {
      this.currencies = data;
      this.currencyCodes = Object.keys(data).map((key) => {
        return { id: key, name: this.currencies[key]['short_code'] };
      });

      this.conversionTrigger
        .pipe(
          debounceTime(500),
          switchMap(({ from, to, amount }) =>
            this.currencyService.convert(from, to, amount)
          )
        )
        .subscribe((result) => {
          this.convertedValue = result;
        });
    });
  }

  onConvert(): void {
    if (this.from && this.to && this.amount >= 1) {
      this.conversionTrigger.next({
        from: this.from,
        to: this.to,
        amount: this.amount,
      });
    }
  }
}
