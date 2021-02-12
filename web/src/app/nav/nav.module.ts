import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RailComponent } from './rail/rail.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar/toolbar.service';
import { MobileToolbarComponent } from './toolbar/mobile-toolbar/mobile-toolbar.component';
import { DesktopToolbarComponent } from './toolbar/desktop-toolbar/desktop-toolbar.component';
import { TabletToolbarComponent } from './toolbar/tablet-toolbar/tablet-toolbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    RailComponent,
    ToolbarComponent,
    MobileToolbarComponent,
    DesktopToolbarComponent,
    TabletToolbarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    ToolbarService
  ],
  exports: [
    FooterComponent,
    RailComponent,
    ToolbarComponent,
    MobileToolbarComponent
  ]
})
export class NavModule { }
