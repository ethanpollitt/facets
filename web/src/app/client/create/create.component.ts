import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { Client } from '../client.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateClientComponent implements OnInit {
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
    public dialogRef: MatDialogRef<CreateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  submit = (): void => {
    const client: Client = this.form.getRawValue();
    this.clientService.createClient(client).subscribe(_ => {
      if (_) {
        this.snackBar.open('Client created!', null, { duration: 5000 });
        this.dialogRef.close(true);
      } else {
        this.snackBar.open('Creation of new Client failed!', null, { duration: 5000, horizontalPosition: 'end' });
      }
    }, _ => {
      this.snackBar.open('Creation of new Client failed!', null, { duration: 5000, horizontalPosition: 'end' });
    });
  }

  close = (): void => {
    this.dialogRef.close(false);
  }
}
