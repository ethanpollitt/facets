import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EncodeUriPipe } from '../shared/pipes/encode-uri.pipe';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { TechnicianComponent } from './technician.component';
import { TechnicianService } from './technician.service';

@NgModule({
  declarations: [
    TechnicianComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    
    SharedModule,
    MaterialModule
  ],
  providers: [
    TechnicianService,
    EncodeUriPipe
  ]
})
export class TechnicianModule { }
