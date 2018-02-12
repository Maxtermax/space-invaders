import Invader from './Invader.js';
import Defender from './Defender.js';
import Viewport from './Viewport.js';
import TextBox from './components/TextBox.js';
import BoxWrapper from './components/BoxWrapper.js';
import { calcCenter, clear, hover, isOverLapping } from './utils/index.js';
const canvas = document.getElementById('lienzo');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');
let viewport = new Viewport(ctx);

class Universe {
  constructor() {
    viewport = Object.assign(viewport, calcCenter({ width: canvasWidth, height: canvasHeight, x: 0, y: 0 }, viewport));
    this.FPS = 1000 / 60;
    this.invadersMomentum = 1;
    hover(canvas, this.checkHover.bind(this));    
  }

  keyEvents() {
    let defender = viewport.elements.filter(element => element.type === 'defender');
    console.log(defender.addBullet)
    const space = 32;
    window.onkeypress = (e) => {
      if (e.keyCode === space) {
      }
    }
  }

  addIndex() {
    viewport.elements.forEach((invader, index) => {
      if (invader.type === 'invader') invader.i = index;
    });
  }

  loadInvaders(rows = 0, colums = 0) {
    const padding = 5;
    const width = 20;
    const height = 20;
    let ancho = (rows * padding) + (rows * width);
    const pullLeft = calcCenter(viewport, { x: 0, y: 0, width: ancho, height: 200 }).x + 25;
    const color = 'white';
    ctx.beginPath();
    for (let i = 0; i < rows; i++) {
      let x = pullLeft + (padding - viewport.x + ((padding + width) * i));
      let y = viewport.y;
      let invaderRow = new Invader(ctx, width, height, x, y, color, [new TextBox(ctx, x, y + padding, 'Hola mundo', true)], viewport);
      invaderRow.type = 'invader';
      viewport.elements.push(invaderRow);
      for (let j = 1; j < colums - 1; j++) {
        invaderRow.j = j;
        let yColum = y + (((padding / 2) + height) * j + 1)
        invaderRow.type = 'invader';
        let invaderColum = new Invader(ctx, width, height, x, yColum, color, [new TextBox(ctx, x, y, 'Hola mundo', true)], viewport);
        invaderColum.j = j;
        viewport.elements.push(invaderColum);
      }
    }
    ctx.closePath();
    this.addIndex();
  }

  checkHover({ x, y }) {
    for (let element of viewport.elements) {
      let isOver = isOverLapping({ x, y, width: 10, height: 10 }, element);
      if (isOver) {
        element.color = 'green';
        element.isOver = true;
        element.overX = x;
        element.overY = y;
        let data = ` x = ${element.x.toFixed(2)} y = ${element.y.toFixed(2)}`;
        element.updateTextBoxes({ display: true, data, x, y });
      } else {
        element.color = 'white';
        element.isOver = false;
        element.updateTextBoxes({ display: false });
      }
    }
  }

  showTextBoxes(debug = false) {
    for (let element of viewport.elements) {
      if (element.isOver || debug) {
        let data = ` x = ${element.x.toFixed(2)} y = ${element.y.toFixed(2)}`;
        element.updateTextBoxes({
          display: true,
          data,
          x: element.overX,
          y: element.overY
        });
      } else {
        element.updateTextBoxes({ display: false });
      }
    }
  }

  render() {
    setInterval(() => {
      clear(canvas);
      this.update();
    }, this.FPS)
  }

  update() {
    viewport.render();
    this.showTextBoxes();
    this.moveInvaders();
  }

  loadDefender() {
    let width = 20;
    let height = 20;
    let x = 0;
    let y = 0;
    let padding = 10;
    let color = 'green';
    let calc = calcCenter(viewport, { x, y, width, height });
    x = calc.x;
    y = (viewport.y + viewport.height) - height;
    let defender = new Defender(ctx, width, height, x, y, color, [new TextBox(ctx, x, y + padding, 'Hola mundo', true)], viewport, 'defender');
    viewport.elements.push(defender);
    this.keyEvents();
  }

  preload() {
    const padding = 10;
    const width = 50;
    const rows = 10;
    const colums = 4;
    this.loadInvaders(rows, colums);
    this.loadDefender();
  }

  moveInvaders() {
    let invaders = viewport.elements.filter(item => item.type === 'invader');
    let acceletarion = 0.09;
    for (let invader of invaders) {
      let calc = Math.sin(this.invadersMomentum) * 5;
      invader.x += calc;
      invader.y += acceletarion;
    }
    this.invadersMomentum += acceletarion;
  }
}

let space = new Universe();
space.preload();
space.render();
