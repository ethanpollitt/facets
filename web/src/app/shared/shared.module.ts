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

@NgModule({
  declarations: [
    EncodeUriPipe,
    AddressComponent,
    MinutesPipe
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
    EncodeUriPipe,
    MinutesPipe,
    AddressComponent
  ]
})
export class SharedModule { }
