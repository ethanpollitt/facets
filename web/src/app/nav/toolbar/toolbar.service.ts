import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToolbarOptions, ButtonOptionsBase } from './toolbar.model';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  updates: BehaviorSubject<ToolbarOptions> = new BehaviorSubject(null);

  private currentOptions: ToolbarOptions;

  constructor() { }

  setOptions = (options: ToolbarOptions) => {
    this.currentOptions = options;
    this.updates.next(this.currentOptions);
  }

  setButtons = (options: ButtonOptionsBase[]) => {
    this.currentOptions.buttons = options;
    this.updates.next(this.currentOptions);
  }

  setTitle = (title: string, subtitle?: string) => {
    this.currentOptions.title = title;
    if (subtitle)
      this.currentOptions.subtitle = subtitle;
    this.updates.next(this.currentOptions);
  }

  setSubtitle = (subtitle: string) => {
    this.currentOptions.subtitle = subtitle;
    this.updates.next(this.currentOptions);
  }
}
