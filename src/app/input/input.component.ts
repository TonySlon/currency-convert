import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder!: string;
  @Input() min!: number;
  @Input() loading!: boolean;
  @Input() value!: number;
  @Output() valueChange = new EventEmitter<any>();

  onInput(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
