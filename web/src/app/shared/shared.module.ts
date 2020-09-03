import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncodeUriPipe } from './pipes/encode-uri.pipe';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [EncodeUriPipe],
  imports: [
    CommonModule
  ],
  exports: [EncodeUriPipe]
})
export class SharedModule { }
