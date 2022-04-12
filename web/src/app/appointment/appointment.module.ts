import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EncodeUriPipe } from '../shared/pipes/encode-uri.pipe';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { AppointmentComponent } from './appointment.component';
import { AppointmentService } from './appointment.service';
import { CreateUpdateAppointmentComponent } from './create-update/create-update.component';
import { AppointmentDetailComponent } from './detail/detail.component';
import { UpdateStatusComponent } from './update-status/update-status.component'
import { MinutesPipe } from '../shared/pipes/minutes.pipe';

@NgModule({
  declarations: [
    AppointmentComponent,
    CreateUpdateAppointmentComponent,
    AppointmentDetailComponent,
    UpdateStatusComponent
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
    EncodeUriPipe,
    DatePipe,
    MinutesPipe
  ]
})
export class AppointmentModule { }
