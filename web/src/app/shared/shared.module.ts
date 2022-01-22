import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { EncodeUriPipe } from './pipes/encode-uri.pipe';
import { AddressComponent } from './components/address/address.component';
import { MaterialModule } from '../material.module';
import { MinutesPipe } from './pipes/minutes.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { ConfirmDiagComponent } from './components/confirm-diag/confirm-diag.component';
import { ErrorDiagComponent } from './components/error-diag/error-diag.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AddressComponent,
    ConfirmDiagComponent,
    ErrorDiagComponent,
    CalendarComponent,
    EncodeUriPipe,
    MinutesPipe,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    AddressComponent,
    ConfirmDiagComponent,
    ErrorDiagComponent,
    CalendarComponent,
    EncodeUriPipe,
    MinutesPipe,
    EllipsisPipe
  ]
})
export class SharedModule { }
