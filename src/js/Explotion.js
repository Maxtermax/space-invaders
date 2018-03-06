export default class Explotion {
  constructor({ctx, x, y}) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.duration = 25;
    this.r = 5;
    this.done = false;
    this.light = 1;
  }

  render() {
    let { ctx, x, y, duration, r, done } = this;
    if(duration <= 0) this.done = true;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.light})`;
    ctx.fill();
    ctx.closePath();
    this.r += 0.5+Math.random();    
    this.light -= 0.08; 
    this.duration -= 1;
  }
}