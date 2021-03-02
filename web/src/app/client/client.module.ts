import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ClientComponent } from './client.component';
import { ClientService } from './client.service';
import { EncodeUriPipe } from '../shared/pipes/encode-uri.pipe';
import { SharedModule } from '../shared/shared.module';
import { CreateUpdateClientComponent } from './create-update/create-update.component';
import { DeleteClientComponent } from './delete/delete.component';
import { MaterialModule } from '../material.module';
import { ClientDetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    ClientComponent,
    CreateUpdateClientComponent,
    DeleteClientComponent,
    ClientDetailComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    
    SharedModule,
    MaterialModule
  ],
  providers: [
    ClientService,
    EncodeUriPipe
  ]
})
export class ClientModule { }
