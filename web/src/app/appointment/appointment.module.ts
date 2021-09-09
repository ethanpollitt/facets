import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EncodeUriPipe } from '../shared/pipes/encode-uri.pipe';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { AppointmentComponent } from './appointment.component';
import { AppointmentService } from './appointment.service';

@NgModule({
  declarations: [
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    
    SharedModule,
    MaterialModule
  ],
  providers: [
    AppointmentService,
    EncodeUriPipe
  ]
})
export class AppointmentModule { }
