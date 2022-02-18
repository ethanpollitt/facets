import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Device } from './shared/models/device';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';
  margin: string = 'margin: 0px;';
  device: Device;

  constructor(
    private appService: AppService,
    private breakpointObserver: BreakpointObserver  
  ) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.HandsetPortrait]) {
        this.setMobileMargin();
        this.device = new Device('mobile');
      }
      if (state.breakpoints[Breakpoints.HandsetLandscape]) {
        this.setMobileMargin();
        this.device = new Device('mobile');
      }
      if (state.breakpoints[Breakpoints.TabletPortrait]) {
        this.setMobileMargin();
        this.device = new Device('tablet');
      }
      if (state.breakpoints[Breakpoints.TabletLandscape]) {
        this.setWebMargin();
        this.device = new Device('desktop');
      }
      if (state.breakpoints[Breakpoints.WebPortrait]) {
        this.setWebMargin();
        this.device = new Device('desktop');
      }
      if (state.breakpoints[Breakpoints.WebLandscape]) {
        this.setWebMargin();
        this.device = new Device('desktop');
      }
      this.appService.setDevice(this.device);
    });
  }

  private setMobileMargin = () => {
      this.margin = 'margin: 0px;';
  }

  private setWebMargin = () => {
    this.margin = 'margin: 16px 24px;';
  }
}
