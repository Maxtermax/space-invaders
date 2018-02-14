import TextBox from './components/TextBox.js';
import { isOverLapping } from './utils/index.js';

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
    this.points = 5;
    this.bulletsMomentum = 2 + Math.random();
  }

  guessProbabiity() {
    let invaders = this.viewport.elements.filter(({ type }) => type === 'invader');
    return (Math.floor(Math.random() * invaders.length) + 0) / 10
  }

  addBullet(data = {}) {
    let bulletWidth = 3;
    let bulletHeight = 3;
    let owner = this;
    let {
      x = this.x + (this.width / 2) - (bulletHeight / 2),
      y = this.y + this.height
    } = data;
    let text = new TextBox(this.ctx, x, y, `y=${y}`, '12px arial', true);
    this.bullets.push({ bulletWidth, bulletHeight, x, y, text, owner });
  }

  updateBullets() {
    let { ctx, bullets, viewport } = this;
    this.bullets = bullets.filter(({ bulletHeight, y, x }) => {
      if (this.type === 'defender' && y <= 0) return false;
      if(y + bulletHeight <= (viewport.y + viewport.height)) return true;
    })
  }

  drawBullets(debug = false) {
    let { ctx, bullets } = this;
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
      if (this.type === 'invader') bullet.y += bulletsMomentum;
      if (this.type === 'defender') bullet.y -= bulletsMomentum;
    }
  }

  shouldFire() {
    let invaders = this.viewport.elements.filter(({ type }) => type === 'invader');
    return invaders.filter(invader => invader.points === 5).every(invader => Math.random() < 0.7);
  }

  checkCollition(bullet, index, entire, item, i, all) {
    if (isOverLapping(bullet, item)) {
      entire.splice(index, 1);//drop bullet
      //if(item.type !== 'defender' || item.type !== 'invader') return;
      item.color = 'orange';
      if (item.points - 1 === 0) item.color = 'red';
      item.points--;
      /*
      let data = `points = ${item.points}`
      item.updateTextBoxes({
        display: true,
        data,
        x: item.x,
        y: item.y
      });
      */
      return true;
    } else {
      //item.color = 'white';
    }
  }

  bulletCollision(items) {
    let { bullets } = this;
    bullets.some((bullet, index, entire) => {
      return items.some(this.checkCollition.bind(this, bullet, index, entire))
    })
  }

  render() {
    let { width, height, x, y, ctx, color } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
    this.updateBullets();
    this.drawBullets();
    if (this.type === 'invader' && this.shouldFire()) {
      this.addBullet();
    }
    this.fire();
  }
}