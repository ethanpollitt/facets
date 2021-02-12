import { MatMenuTrigger } from '@angular/material/menu';

export class ToolbarOptions {
  title?: string;
  subtitle?: string;
  buttons?: ButtonOptionsBase[];
}

export type ButtonType = 'base' | 'icon' | 'text' | 'menu' | 'fab';
export type ButtonColor = 'primary' | 'accent' | 'default';

export class ButtonOptionsBase {
  private _action: Function;
  private _color: ButtonColor;
  private _tooltip?: string;
  protected _type: ButtonType = 'base';

  constructor(action: Function, color: ButtonColor, tooltip?: string) {
    this._action = action;
    this._color = color;
    if (tooltip)
      this._tooltip = tooltip;
  }

  get type(): ButtonType {
    return this._type;
  }

  get action(): Function {
    return this._action;
  }

  get color(): ButtonColor {
    return this._color;
  }

  get tooltip(): string {
    return this._tooltip;
  }
}

export class IconButtonOptions extends ButtonOptionsBase {
  protected _icon: string;

  constructor(action: Function, color: ButtonColor, icon: string, tooltip?: string) {
    super(action, color, tooltip);
    this._type = 'icon';

    this._icon = icon;
  }

  get icon(): string {
    return this._icon;
  }
}

export class IconFabOptions extends IconButtonOptions {
  constructor(action: Function, color: ButtonColor, icon: string, tooltip?: string) {
    super(action, color, icon, tooltip);
    this._type = 'fab';
  }
}

export class TextButtonOptions extends ButtonOptionsBase {
  private _text: string;

  constructor(action: Function, color: ButtonColor, text: string, tooltip?: string) {
    super(action, color, tooltip);
    this._type = 'text';

    this._text = text;
  }

  get text(): string {
    return this._text;
  }
}

export class MenuButtonOptions extends ButtonOptionsBase {
  private _trigger: MatMenuTrigger;

  constructor(action: Function, color: ButtonColor, trigger: MatMenuTrigger, tooltip?: string) {
    super(action, color, tooltip);
    this._type = 'menu';

    this._trigger = trigger;
  }

  get trigger(): MatMenuTrigger {
    return this._trigger;
  }
}
