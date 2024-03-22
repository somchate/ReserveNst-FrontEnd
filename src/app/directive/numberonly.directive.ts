import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberOnly]',
  standalone: true
})
export class NumberOnlyDirective {
  @Input() maxlength: number = 5;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    const regex = new RegExp(/^\d+$/);
    if (!regex.test(value)) {
      inputElement.value = value.replace(/[^0-9]/g, '');
    }

    if (value.length > this.maxlength) {
      inputElement.value = value.slice(0, this.maxlength);
    }
  }
}
