import { Component, Input } from '@angular/core';
import { ButtonOptionsBase } from '../toolbar.model';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss']
})
export class DesktopToolbarComponent {
  title: string;
  subtitle: string;
  buttons: ButtonOptionsBase[];

  constructor() { }

  @Input('title')
  set _title(title: string) {
    this.title = title;
  }

  @Input('subtitle')
  set _subtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  @Input('buttons')
  set _buttons(buttons: ButtonOptionsBase[]) {
    this.buttons = buttons;
  }
}
