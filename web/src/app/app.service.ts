import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Device } from './shared/models/device';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  deviceUpdates: BehaviorSubject<Device> = new BehaviorSubject(null);

  private currentDevice: Device;

  constructor() { }

  setDevice = (device: Device) => {
    this.currentDevice = device;
    this.deviceUpdates.next(this.currentDevice);
  }
}
