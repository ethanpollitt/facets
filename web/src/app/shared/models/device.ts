export class Device {
  private _type: DeviceType;
  private _sizeX: number;
  private _sizeY: number;

  constructor(type: DeviceType)
  constructor(type: DeviceType, sizeX: number, sizeY: number)
  constructor(type: DeviceType, sizeX?: number, sizeY?: number) {
    this._type = type;
    if (sizeX)
      this._sizeX = sizeX;
    else
      this._sizeX = window.innerWidth;
    if (sizeY)
      this._sizeY = sizeY;
    else
      this._sizeY = window.innerHeight;
  }

  get type() {
    return this._type;
  }

  get sizeX() {
    return this._sizeX;
  }

  get sizeY() {
    return this._sizeY;
  }

  get isMobile() {
    return this._type === 'mobile';
  }

  get isTablet() {
    return this._type === 'tablet';
  }

  get isDesktop() {
    return this._type === 'desktop';
  }

  static infer(): Device {
    let deviceType: DeviceType;
    if (window.innerWidth > 599)
      deviceType = 'tablet';
    else if (window.innerWidth > 1023)
      deviceType = 'desktop';
    else
      deviceType = 'mobile';
    return new Device(deviceType, window.innerWidth, window.innerHeight)
  }
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
