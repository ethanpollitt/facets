import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../client.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    public dialogRef: MatDialogRef<ClientDetailComponent>
  ) {
    this.client = data.client;
  }

  ngOnInit(): void { }

  close = (): void => {
    this.dialogRef.close(false);
  }
}
