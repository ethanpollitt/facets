import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from './client.service';
import { Client } from './client.model';
import { ToolbarService } from '../nav/toolbar/toolbar.service';
import { ToolbarOptions, IconButtonOptions } from '../nav/toolbar/toolbar.model';
import { CreateClientComponent } from './create/create.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: Client[];

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit(): void {
    const action = () => {
      const dialogRef = this.dialog.open(CreateClientComponent, {
        autoFocus: true,
        disableClose: true,
        hasBackdrop: true,
        minWidth: 320
      });

      dialogRef.afterClosed().subscribe(_ => {
        console.log('The dialog was closed');
        if (_) {
          const s = this.clientService.getClients().subscribe(_ => {
            this.clients = _;
            s.unsubscribe();
          });
        }
      });
    };
    const newBtn: IconButtonOptions = new IconButtonOptions(action, 'accent', 'add_circle_outline', 'Add new Client');
    const options: ToolbarOptions = {
      title: 'Clients',
      buttons: [newBtn]
    };
    this.toolbarService.setOptions(options);

    const s = this.clientService.getClients().subscribe(_ => {
      this.clients = _;
      s.unsubscribe();
    });
  }
}
