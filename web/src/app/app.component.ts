import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';
  margin: string = 'margin: 0px;';
  isMobile: boolean = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.HandsetPortrait]) {
        this.setMobileMargin();
        this.isMobile = true;
      }
      if (state.breakpoints[Breakpoints.HandsetLandscape]) {
        this.setMobileMargin();
        this.isMobile = true;
      }
      if (state.breakpoints[Breakpoints.TabletPortrait]) {
        this.setMobileMargin();
        this.isMobile = true;
      }
      if (state.breakpoints[Breakpoints.TabletLandscape]) {
        this.setWebMargin();
        this.isMobile = false;
      }
      if (state.breakpoints[Breakpoints.WebPortrait]) {
        this.setWebMargin();
        this.isMobile = false;
      }
      if (state.breakpoints[Breakpoints.WebLandscape]) {
        this.setWebMargin();
        this.isMobile = false;
      }
    });
  }

  private setMobileMargin = () => {
      this.margin = 'margin: 0px;';
  }

  private setWebMargin = () => {
    this.margin = 'margin: 24px;';
  }
}
