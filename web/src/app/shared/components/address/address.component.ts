import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/client/client.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements AfterViewInit {
  @Output()
  change: EventEmitter<void> = new EventEmitter();

  form: FormGroup = new FormGroup({
    streetAddr: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    zip: new FormControl(null, Validators.pattern('([0-9]{5}[- ]?)?([0-9]{5})'))
  });

  constructor() { }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => {
      this.change.emit();
    });
  }

  @Input()
  set address(address: Address) {
    this.form.controls.streetAddr.setValue(address.streetAddr);
    this.form.controls.city.setValue(address.city);
    this.form.controls.state.setValue(address.state);
    this.form.controls.zip.setValue(address.zip);
  }

  @Input()
  set disabled(disabled: boolean) {
    if (disabled)
      this.form.disable();
    else
      this.form.enable();
  }

  isValid = (): boolean => (this.form.touched || this.form.dirty) && this.form.valid;

  getValue = (): Address => {
    let address: Address;
    try {
      address = new Address(this.form.getRawValue());
    } catch (e) {
      console.error(e);
    }
    return address;
  }
}