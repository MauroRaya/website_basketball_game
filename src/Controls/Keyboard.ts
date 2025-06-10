export class Keyboard {
  private keys: Record<string, boolean> = {};

  constructor() {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
  }

  private keyDown = (e: KeyboardEvent) => {
    this.keys[e.key.toLowerCase()] = true;
  }

  private keyUp = (e: KeyboardEvent) => {
    this.keys[e.key.toLowerCase()] = false;
  }

  getKeys(): Record<string, boolean> {
    return {...this.keys};
  }

  isPressed(e: string): boolean {
    return !!this.keys[e.toLowerCase()];
  }

  destroy() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  }
}