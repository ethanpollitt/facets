import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconOptions } from '../../models/icon';

@Component({
  selector: 'app-confirm-diag',
  templateUrl: './confirm-diag.component.html',
  styleUrls: ['./confirm-diag.component.scss']
})
export class ConfirmDiagComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, icon?: IconOptions, confirmBtnText?: string },
    public dialogRef: MatDialogRef<ConfirmDiagComponent>
  ) { }

  ngOnInit(): void {
    if (!('title' in this.data) || !('message' in this.data)) {
      this.dialogRef.close(false);
      throw new Error(`Missing arguments! (${JSON.stringify(this.data)})`);
    }
    console.log(this.data.icon);
  }
}
