import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() currencyCodes!: { id: string; name: string }[];
  @Input() currencies: any = {};
  @Input() loading!: boolean;
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<any>();

  onDropDownChange(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
