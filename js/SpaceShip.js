import TextBox from './components/TextBox.js';

export default class SpaceShip {
  constructor(ctx, width, height, x, y, color = 'red', elements = [], viewport, type = 'invader') {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.viewport = viewport;
    this.color = color;
    this.elements = elements;
    this.isOver = false;
    this.overX = 0;
    this.overY = 0;
    this.bullets = [];
    this.type = type;
    this.bulletsMomentum = 1 + Math.random();
  }

  guessProbabiity() {
    let invaders = this.viewport.elements.filter(({ type }) => type === 'invader');
    return (Math.floor(Math.random() * invaders.length) + 0) / 10
  }

  addBullet() {
    let bulletWidth = 3;
    let bulletHeight = 3;
    let x = this.x + (this.width / 2) - (bulletHeight / 2);
    let y = this.y + this.height;
    let text = new TextBox(this.ctx, x, y, `y=${y}`, '12px arial', true);
    this.bullets.push({ bulletWidth, bulletHeight, x, y, text });
  }

  updateBullets() {
    let { ctx, bullets, viewport } = this;
    this.bullets = bullets.filter(({ bulletHeight, y }) => y + bulletHeight <= (viewport.y + viewport.height))
  }

  drawBullets() {
    let { ctx, bullets } = this;
    let debug = false;
    for (let bullet of bullets) {
      let { bulletWidth, bulletHeight, x, y, text } = bullet;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillRect(x, y, bulletWidth, bulletHeight);
      ctx.closePath();
      if (debug) {
        text.x = x;
        text.y = y;
        text.data = `y=${y.toFixed(2)}`;
        text.render();
      }
    }
  }

  updateTextBoxes(data) {
    for (let element of this.elements) {
      element = Object.assign(element, data);
      element.render();
    }
  }

  fire() {
    let { bullets, ctx, bulletsMomentum } = this;
    for (let bullet of bullets) {
      bullet.y += bulletsMomentum;
    }
  }

  shouldFire() {
    let invaders = this.viewport.elements.filter(({ type }) => type === 'invader');
    //&& Math.random() < 0.2 && Math.random() < 0.1
    //let probability = invaders.length / 10;
    //if(probability === 1) probability = 0.5
    //this.probability = this.guessProbabiity();
    return invaders.every(invader => Math.random() < 0.5);

  }

  render() {
    let { width, height, x, y, ctx, color } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
    this.updateBullets();
    this.drawBullets();
    if (this.shouldFire()) {
      this.addBullet();
    }
    this.fire();
    /*
    */
  }
}