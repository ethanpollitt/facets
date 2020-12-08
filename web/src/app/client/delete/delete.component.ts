import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../client.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteClientComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    public dialogRef: MatDialogRef<DeleteClientComponent>,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {
    if (!this.data || !this.data.client)
      throw new Error('Delete requires a list of one or more clients!');
  }

  submit = (): void => {
    this.clientService.deleteClient(this.data.client.id).subscribe(_ => {
      if (_)
        this.snackBar.open('Client deleted.', null, { duration: 5000, horizontalPosition: 'end' });
      else
        this.snackBar.open('Deletion of Client failed!', null, { duration: 10000, horizontalPosition: 'end' });
      this.dialogRef.close(_);
    }, _ => {
      this.snackBar.open('Deletion of Client failed!', null, { duration: 10000, horizontalPosition: 'end' });
      this.dialogRef.close(false);
    });
  }

  close = (): void => {
    this.dialogRef.close(false);
  }
}
