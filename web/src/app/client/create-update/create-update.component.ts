import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { Client } from '../client.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateClientComponent implements OnInit {
  currentClient: Client;
  form: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNum: new FormControl(null, [Validators.pattern('(([\+]?[0-9][- ]?)?([\(]?[0-9]{3}[\)]?[- ]?))?([0-9]{3}[- ]?)([0-9]{4})'), Validators.required]),
    streetAddr: new FormControl(null),
    city: new FormControl(null),
    state: new FormControl(null),
    zipCode: new FormControl(null, Validators.pattern('([0-9]{5}[- ]?)?([0-9]{5})')),
    isSqrCust: new FormControl(false)
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

  private create = (): void => {    
    const client: Client = new Client(this.form.getRawValue());
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
    const newClient: Client = new Client(this.form.getRawValue());

    // Compare the clients, return if equal
    if (newClient.isEqual(this.currentClient))
      return;

    // Set ID on new client object & send
    newClient.id = this.currentClient.id;
    this.clientService.updateClient(newClient).subscribe(_ => {
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
