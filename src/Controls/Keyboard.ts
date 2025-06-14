export class Keyboard {
  private keys: Record<string, boolean> = {};
  private holdTimes: Record<string, { start: number | null; end: number | null }> = {};
  private allowedKeys = ["w", "a", "s", "d", " ", "q", "e"];

  constructor() {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
  }

  private keyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (!this.allowedKeys.includes(key)) return;

    this.keys[key] = true;

    if (!this.holdTimes[key]) {
      this.holdTimes[key] = { start: null, end: null };
    }

    if (this.holdTimes[key].start === null) {
      this.holdTimes[key].start = performance.now();
      this.holdTimes[key].end = null;
    }
  }

  private keyUp = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    this.keys[key] = false;

    if (!this.holdTimes[key]) return;
    this.holdTimes[key].end = performance.now();
  }

  isPressed(key: string) {
    return !!this.keys[key];
  }

  getHoldStartTime(key: string): number | null {
    return this.holdTimes[key]?.start ?? null;
  }

  getHoldEndTime(key: string): number | null {
    return this.holdTimes[key]?.end ?? null;
  }

  getHoldDuration(key: string): number {
    const time = this.holdTimes[key];
    if (!time || time.start === null || time.end === null) return 0;
    return time.end - time.start;
  }

  clearHold(key: string) {
    if (this.holdTimes[key]) {
      this.holdTimes[key].start = null;
      this.holdTimes[key].end = null;
    }
  }

  destroy() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  }
}