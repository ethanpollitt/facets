import { Component, Input, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { ButtonOptionsBase } from './toolbar.model';
import { Device } from '../../shared/models/device';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  title: string;
  subtitle: string;
  buttons: ButtonOptionsBase[];
  device: Device;

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.updates.subscribe(_ => {
      if (!_)
        return;

      if (_.title)
        this.title = _.title;
      if (_.subtitle)
        this.subtitle = _.subtitle;
      if (_.buttons)
        this.buttons = _.buttons;
    });
  }

  @Input('device')
  set _device(device: Device) {
    this.device = device;
  }
}
