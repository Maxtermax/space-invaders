import Invader from './Invader.js';
import Defender from './Defender.js';
import Viewport from './Viewport.js';
import TextBox from './components/TextBox.js';
import BoxWrapper from './components/BoxWrapper.js';
import { calcCenter, clear, hover, isOverLapping } from './utils/index.js';
const canvas = document.getElementById('lienzo');
const btnLeft = document.getElementById('bnt-left');
const btnRigth = document.getElementById('btn-rigth');
const btnFire = document.getElementById('btn-fire');
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
    //this.showCoordinates();
  }

  showCoordinates() {
    let x = 100;
    let y = 50;
    this.coordinates = new TextBox(ctx, x, y, 'test FEW', true);
    this.coordinates.type = 'coordinates';
    viewport.elements.push(this.coordinates);
    canvas.addEventListener('mousemove', (e) => {
      let data = canvas.getBoundingClientRect();
      viewport.elements.some((element, index, entire) => {
        if (element.type === 'coordinates') {
          entire[index].data = `x = ${e.clientX - data.x}, y = ${e.clientY - data.y}`;
          return true;
        }
      })
    })
  }

  keyEvents() {
    const KeySpace = 32;
    const keyLeft = 37;
    const keyRigth = 39;
    const momentum = 10 + Math.random();
    let defender = viewport.elements.filter(element => element.type === 'defender')[0];
    window.onkeydown = (e) => {
      if (e.keyCode === KeySpace) {
        defender.addBullet({ y: defender.y });
      }
      if (e.keyCode === keyLeft) {
        if ((defender.x + defender.width - 20) <= viewport.x) return;
        defender.x -= momentum;
      }
      if (e.keyCode === keyRigth) {
        if ((defender.x + defender.width) >= viewport.width + viewport.x) return;
        defender.x += momentum;
      }
    }
  }

  controls() {
    const momentum = 10 + Math.random();
    let defender = viewport.elements.filter(element => element.type === 'defender')[0];
    btnLeft.addEventListener('mousedown', function () {
      if ((defender.x + defender.width - 20) <= viewport.x) return;
      defender.x -= momentum;
    })

    btnRigth.addEventListener('mousedown', function () {
      if ((defender.x + defender.width) >= viewport.width + viewport.x) return;
      defender.x += momentum;
    })
    
    btnFire.addEventListener('mousedown', function () {
      defender.addBullet({ y: defender.y });
    })
  }

  addIndex() {
    viewport.elements.forEach((invader, index) => {
      if (invader.type === 'invader') invader.i = index;
    });
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
        if (element.updateTextBoxes) element.updateTextBoxes({ display: true, data, x, y });
      } else {
        element.color = 'white';
        element.isOver = false;
        if (element.updateTextBoxes) element.updateTextBoxes({ display: false });
      }
    }
  }

  showTextBoxes(debug = false) {
    for (let element of viewport.elements) {
      if (element.isOver || debug) {
        let data = ` x = ${element.x.toFixed(2)} y = ${element.y.toFixed(2)}`;
        if (element.type === 'invader') {
          element.updateTextBoxes({
            display: true,
            data,
            x: element.overX || element.x,
            y: element.overY || element.y
          });
        }
      } else {
        if (element.type === 'invader') element.updateTextBoxes({ display: false });
      }
    }
  }

  render() {
    let game = setInterval(() => {
      clear(canvas);
      let invaders = viewport.elements.filter(element => element.type === 'invader');
      let defender = viewport.elements.filter(element => element.type === 'defender')[0];
      //console.log(defender.points);
      if (defender.points < 0 || invaders.length && invaders.some(invader => invader.y >= (viewport.height + viewport.y))) {
        alert("you lose");
        window.location.reload();
        return clearInterval(game);
      }

      if (invaders.length === 0) {
        alert("you win");
        window.location.reload();
        return clearInterval(game);
      }
      this.update();
    }, this.FPS)
  }

  checkCollitions(element, index, entire) {
    if (element.type === 'defender') {
      element.bulletCollision(entire.filter(item => item.type === 'invader' || item.type === 'bullet'), viewport.elements);
    } else if (element.type === 'invader') {
      element.bulletCollision(entire.filter(item => item.type === 'defender' || item.type === 'bullet'), viewport.elements);
    }
  }

  checkIsAlive(element, index, entire) {
    if (element.type === 'invader') {
      if (element.points < 0) entire.splice(index, 1);
    }
  }

  update() {
    viewport.render([this.checkIsAlive, this.checkCollitions]);
    //this.showTextBoxes(false);
    this.moveInvaders();
  }

  loadInvaders(rows = 0, colums = 0) {
    const padding = 5;
    const width = 20;
    const height = 20;
    let ancho = (rows * padding) + (rows * width);
    const pullLeft = -123//calcCenter(viewport, { x: 0, y: 0, width: ancho, height: 200 }).x - 50;
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
    this.controls();
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
    let acceletarion = 0.06;
    for (let invader of invaders) {
      let calc = Math.sin(this.invadersMomentum) * 2;
      invader.x += calc;
      invader.y += acceletarion;
    }
    this.invadersMomentum += acceletarion;
  }
}

let space = new Universe();
space.preload();
space.render();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
