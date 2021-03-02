import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../client.service';
import { Client } from '../client.model';
import { AddressComponent } from 'src/app/shared/components/address/address.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-client-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateClientComponent implements OnInit {
  @ViewChild('serviceAddress')
  serviceAddress: AddressComponent;
  @ViewChild('billingAddress')
  billingAddress: AddressComponent;

  sameAddr: boolean = false;
  currentClient: Client;
  addressValid: boolean = true;
  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    primaryPhoneNum: new FormControl(null, [Validators.pattern('(([\+]?[0-9][- ]?)?([\(]?[0-9]{3}[\)]?[- ]?))?([0-9]{3}[- ]?)([0-9]{4})'), Validators.required]),
    secondaryPhoneNum: new FormControl(null, [Validators.pattern('(([\+]?[0-9][- ]?)?([\(]?[0-9]{3}[\)]?[- ]?))?([0-9]{3}[- ]?)([0-9]{4})')]),
    email: new FormControl(null, [Validators.email]),
    // squareCust: new FormControl(false)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    public dialogRef: MatDialogRef<CreateUpdateClientComponent>,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.client) {
      this.currentClient = this.data.client;
      Object.keys(this.form.controls).forEach(_ => this.form.controls[_].setValue(this.currentClient[_]));
      
      // Check if addresses are same
      this.sameAddr = this.currentClient.billingAddr.isEqual(this.currentClient.serviceAddr);
    }
  }

  submit = (): void => {
    if (this.currentClient)
      this.update();
    else
      this.create();
  }

  close = (): void => {
    this.dialogRef.close(false);
  }

  onServiceAddressChange = (event: Event): void => {
    this.addressValid = this.serviceAddress.isValid() && (this.sameAddr || this.billingAddress.isValid());
    if (this.sameAddr)
      this.billingAddress.address = this.serviceAddress.getValue();
  }

  onBillingAddressChange = (event: Event): void => {
    this.addressValid = this.serviceAddress.isValid() && (this.sameAddr || this.billingAddress.isValid());
  }

  sameAddrChange = (event: MatCheckboxChange): void => {
    this.sameAddr = event.checked;
    if (this.sameAddr)
      this.billingAddress.address = this.serviceAddress.getValue();
  }

  private create = (): void => {    
    const client: Client = new Client(this.form.getRawValue());
    client.serviceAddr = this.serviceAddress.getValue();
    client.billingAddr = this.billingAddress.getValue();

    this.clientService.createClient(client).subscribe(_ => {
      if (_) {
        this.snackBar.open('Client created!', null, { duration: 5000, horizontalPosition: 'end' });
        this.dialogRef.close(_);
      } else
        this.snackBar.open('Creation of new Client failed!', null, { duration: 10000, horizontalPosition: 'end' });
    }, _ => {
      this.snackBar.open('Creation of new Client failed!', null, { duration: 10000, horizontalPosition: 'end' });
    });
  }

  private update = (): void => {
    const client: Client = new Client(this.form.getRawValue());
    client.serviceAddr = this.serviceAddress.getValue();
    client.billingAddr = this.billingAddress.getValue();

    // Compare the clients, return if equal
    if (client.isEqual(this.currentClient))
      return;

    // Set ID on new client object & send
    client.id = this.currentClient.id;
    this.clientService.updateClient(client).subscribe(_ => {
      if (_) {
        this.snackBar.open(`Client ${this.currentClient.id} updated!`, null, { duration: 5000, horizontalPosition: 'end' });
        this.dialogRef.close(_);
      } else
        this.snackBar.open(`Updating Client ${this.currentClient.id} failed!`, null, { duration: 10000, horizontalPosition: 'end' });
    }, _ => {
      this.snackBar.open(`Updating Client ${this.currentClient.id} failed!`, null, { duration: 10000, horizontalPosition: 'end' });
    });
  }
}
