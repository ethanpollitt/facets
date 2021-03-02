import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AppService } from '../app.service';
import { ClientService } from './client.service';
import { Client } from './client.model';
import { ToolbarService } from '../nav/toolbar/toolbar.service';
import { ToolbarOptions, IconButtonOptions } from '../nav/toolbar/toolbar.model';
import { CreateUpdateClientComponent } from './create-update/create-update.component';
import { DeleteClientComponent } from './delete/delete.component';
import { Device } from '../shared/models/device';
import { ClientDetailComponent } from './detail/detail.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  hasClients: boolean = false;
  selected: number[] = [];
  addresses: Map<number, { sa: string, ba: string }>;
  device: Device;
  displayedFields: string[] = [];
  dataSource: MatTableDataSource<Client>;

  private clients: Client[];
  private allFields: string[] = ["fullName", "type", "primaryTel", "secondaryTel", "email", "serviceAddr", "billingAddr", "processor"];
  private tabletFields: string[] = ["fullName", "type", "primaryTel"];
  private mobileFields: string[] = ["fullName", "type", "primaryTel"];

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private toolbarService: ToolbarService,
    private appService: AppService
  ) {
    this.appService.deviceUpdates.subscribe(_ => {
      this.device = _;
    });
  }

  ngOnInit(): void {
    this.setBtns({ add: true });

    const s = this.clientService.getClients().subscribe(_ => {
      // Set internal clients object & initialize data source
      this.clients = _;
      this.hasClients = this.clients.length > 0;
      this.dataSource = new MatTableDataSource<Client>(this.clients);

      this.buildAddresses();
      this.setDisplayedFields();
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

    this.setBtns({ add: true, detail: this.selected.length > 0, delete: this.selected.length > 0, update: this.selected.length === 1 });
  }

  private setBtns = (btnIds: { add?: boolean, update?: boolean, delete?: boolean, detail?: boolean }): void => {
    const newBtns: IconButtonOptions[] = [];
    if (btnIds.add)
      newBtns.push(new IconButtonOptions(() => this.showCreateUpdateDiag(), 'accent', 'add_circle_outline', 'Add new Client'));
    if (btnIds.detail)
      newBtns.push(new IconButtonOptions(() => this.showDetailDiag(this.clients[this.selected[0]]), 'accent', 'description', `Show details on selected Client`));
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
        this.afterClientsChange();
        this.buildAddresses();
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
      console.log(`The delete dialog was closed`);
      if (_) {
        this.clients = this.clients.filter(_ => _.id !== client.id);
        this.afterClientsChange();
      }
    });
  }

  private showDetailDiag = (client: Client): void => {
    const dialogRef = this.dialog.open(ClientDetailComponent, {
      data: { client: client },
      autoFocus: true,
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log(`The detail dialog was closed`);
    });
  }

  private buildAddresses = (): void => {
    this.addresses = new Map<number, { sa: string, ba: string }>();
    this.clients.forEach((_: Client) => {
      this.addresses.set(_.id, { sa: _.serviceAddr.toString(), ba: _.billingAddr.toString() });
    });
  }

  private afterClientsChange = (): void => {
    this.hasClients = this.clients.length > 0;
    this.dataSource.data = this.clients;
    this.dataSource._updateChangeSubscription();
  }

  private setDisplayedFields = (): void => {
    if (this.device.isDesktop)
      this.displayedFields = this.allFields.map(_ => _);
    else if (this.device.isTablet)
      this.displayedFields = this.tabletFields.map(_ => _);
    else
      this.displayedFields = this.mobileFields.map(_ => _);
  }
}
