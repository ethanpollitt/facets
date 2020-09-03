import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ClientComponent } from './client.component';
import { ClientService } from './client.service';
import { EncodeUriPipe } from '../shared/pipes/encode-uri.pipe';
import { SharedModule } from '../shared/shared.module';
import { CreateClientComponent } from './create/create.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ClientComponent,
    CreateClientComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,

    SharedModule
  ],
  providers: [
    ClientService,
    EncodeUriPipe
  ]
})
export class ClientModule { }
