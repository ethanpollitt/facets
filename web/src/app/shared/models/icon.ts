export class IconOptions {
  private _color: string;
  private _lignature: string;

  constructor(lig: string)
  constructor(lig: string, color: ColorOptions)
  constructor(lig: string, color?: ColorOptions) {
    this._lignature = lig;
    if (color)
      this._color = color;
    else
      this._color = 'primary';
  }

  get color() {
    return this._color;
  }

  get lignature() {
    return this._lignature;
  }
}

export type ColorOptions = 'primary' | 'accent';
