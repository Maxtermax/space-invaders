import Invader from './invader.js';
import Viewport from './viewport.js';
import TextBox from './components/TextBox.js';
import { calcCenter, clear, hover, isOverLapping } from './utils/index.js';
const canvas = document.getElementById('lienzo');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');
window.viewport = new Viewport(ctx);

const loadInvaders = (rows = 0, colums = 0) => {
  const padding = 10;
  const width = 50;
  const height = 50;
  const color = 'white';
  ctx.beginPath();
  for (let i = 0; i < rows; i++) {
    let x = (padding + width) * i;
    let y = 0;
    let invaderRow = new Invader(ctx, width, height, Math.sin(x), y, color);
    invaderRow.render();
    viewport.push(invaderRow);
    for (let j = 0; j < colums; j++) {
      let yColum = (y + padding + height) * j
      let invaderColum = new Invader(ctx, width, height, x, yColum, color);
      invaderColum.render();
      viewport.push(invaderColum);
    }
  }
  ctx.closePath();
}

window.preload = () => {
  loadInvaders(1);
}

viewport = Object.assign(viewport, calcCenter({ width: canvasWidth, height: canvasHeight, x: 0, y: 0 }, viewport));

const update = () => {
  clear(canvas);
}

let width = 50;
let height = 50;
let { x, y } = calcCenter(viewport, { width, height });
let a = new Invader(ctx, width, height, x, y, 'white');
viewport.elements.push(a);
hover(canvas, ({x, y}) => {
  for (let element of viewport.elements) {
    let isOver = isOverLapping({x, y, width: 10, height: 10}, element);
    let text;
    if(isOver) {
      element.color = 'green';
      element.render();
      text = new TextBox(ctx, x, y, 'Hola mundo');
      viewport.elements.push(text);
      //text.render();
    } else {
      element.color = 'white';
      if(text) text.destroy();
    }
  }
})
viewport.render();

setInterval(() => {
  update();
  viewport.render();
}, 1000 / 60)
