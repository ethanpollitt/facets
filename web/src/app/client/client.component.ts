import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from './client.service';
import { Client } from './client.model';
import { ToolbarService } from '../nav/toolbar/toolbar.service';
import { ToolbarOptions, IconButtonOptions } from '../nav/toolbar/toolbar.model';
import { CreateUpdateClientComponent } from './create-update/create-update.component';
import { DeleteClientComponent } from './delete/delete.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: Client[];
  selected: number[] = [];
  addresses: Map<number, string>;

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit(): void {
    this.setBtns({ add: true });

    const s = this.clientService.getClients().subscribe(_ => {
      this.clients = _;
      this.buildAddresses();
      s.unsubscribe();
    });
  }

  public onRowClick = (i: number): void => {
    if (this.selected.includes(i))
      this.selected = [];
      // this.selected = this.selected.filter(_ => _ !== i);
    else
      this.selected = [i];
      // this.selected.push(i);

    this.setBtns({ add: true, delete: this.selected.length > 0, update: this.selected.length === 1 });
  }

  private setBtns = (btnIds: { add?: boolean, update?: boolean, delete?: boolean }): void => {
    const newBtns: IconButtonOptions[] = []
    if (btnIds.add)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(), 'accent', 'add_circle_outline', 'Add new Client'));
    if (btnIds.update)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(this.clients[this.selected[0]]), 'accent', 'create', 'Update selected Client'));
    if (btnIds.delete)
      newBtns.push(new IconButtonOptions(() => this.showDeleteDiag(this.clients[this.selected[0]]), 'accent', 'delete_outline', `Delete selected Client${this.selected.length > 1 ? 's' : ''}`));

    const options: ToolbarOptions = {
      title: 'Clients',
      buttons: newBtns
    };
    this.toolbarService.setOptions(options);
  }

  private showCreateUpdateDiag = (client?: Client): void => {
    const dialogRef = this.dialog.open(CreateUpdateClientComponent, {
      data: client ? { client: client } : null,
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(`The dialog was closed (${client ? 'update' : 'add'})`);
      if (_) {
        if (client)
          this.clients = this.clients.filter(_ => _.id !== client.id);
        this.clients.push(_);
        this.clients.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      }
    });
  }

  private showDeleteDiag = (client: Client): void => {    
    const dialogRef = this.dialog.open(DeleteClientComponent, {
      data: { client: client },
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(`The dialog was closed (${client ? 'update' : 'add'})`);
      if (_)
        this.clients = this.clients.filter(_ => _.id !== client.id);
    });
  }

  private buildAddresses = (): void => {
    this.addresses = new Map<number, string>();
    this.clients.forEach(_ => {
      let addr = _.streetAddr + ', ' + _.city + ', ' + _.state;
      if (_.zip)
        addr += ' ' + _.zip;
      this.addresses.set(_.id, addr);
    });
  }
}
