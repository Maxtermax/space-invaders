import Invader from './Invader.js';
import Defender from './Defender.js';
import Viewport from './Viewport.js';
import TextBox from './components/TextBox.js';
import BoxWrapper from './components/BoxWrapper.js';
import Controls from './Controls.js'
import { calcCenter, clear, hover, isOverLapping } from './utils/index.js';
const intViewportWidth = window.innerWidth;
const intViewportHeight = window.innerHeight;
const canvas = document.getElementById('lienzo');
let canvasWidth;
if(intViewportWidth > 425)  {
  canvasWidth = canvas.width = 425;
} else {
  canvasWidth = canvas.width = intViewportWidth;
}
let old = Date.now();


const canvasHeight = canvas.height = intViewportHeight;
const ctx = canvas.getContext('2d');
let viewport = new Viewport(canvas);

class Universe extends Controls {
  constructor() {
    viewport = Object.assign(viewport, calcCenter({ width: canvasWidth, height: canvasHeight, x: 0, y: 0 }, viewport));
    window.vp = viewport;
    viewport.y = 40;
    super({viewport,ctx, canvas});        
    this.FPS = 1000 / 60;
    this.invadersMomentum = 1;
  }


  render() {
    let game = setInterval(() => {
      clear(canvas);            
      let invaders = viewport.get('invader');
      let defender = viewport.get('defender')[0];      
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

  removeExplotions(element, index, entire) {
    if(entire[index].done) entire.splice(index, 1);
  }
  
  update() {
    this.renderJoyStick();
    viewport.render([this.checkIsAlive, this.checkCollitions, this.removeExplotions]);
    this.moveInvaders();    
    
    if(Date.now() - old >= 1000) {
      viewport.get('invader').forEach((invader) => {        
        if(invader.skinType === 'a') {         
          invader.skinType = 'b';
        } else {
          if(invader.skinType === 'b') invader.skinType = 'a';                    
        }
        old = Date.now();        
      })
    }       
    
  }

  loadInvaders({rows = 0, x, y, width, height, padding, skin}) {
    const color = 'white';
    ctx.beginPath();
    for(let i = 0; i < rows;i++) {
      x += width + padding;
      let invaderRow = new Invader(ctx, width, height, x, y, color, [new TextBox(ctx, x, y + padding, 'Hola mundo', true)], viewport, skin);
      viewport.elements.push(invaderRow);      
    }
    ctx.closePath();
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
    y = (viewport.y + viewport.height) - height-20;
    let defender = new Defender(ctx, width, height, x, y, color, [new TextBox(ctx, x, y + padding, 'Hola mundo', true)], viewport, 'defender');
    viewport.elements.push(defender);
  }

  loadSprites(skin) {
    return fetch('/invaders-sprites.gif')
      .then(response => response.blob())
      .then(myBlob => {
        skin.src = URL.createObjectURL(myBlob);
      })
  }

  async preload() {
    const colums = 10;
    const padding = 5;
    const width = 25;
    const height = 20;
    const x = viewport.x- 20;
    const y = viewport.y + width - 20;
    let rows = Math.floor(vp.width/(width + padding))-1;    
    const HOW_MANY = 4;
    let skin = new Image();
    await this.loadSprites(skin);    
    for(let i = 0; i < HOW_MANY; i++) {
      this.loadInvaders({ rows, x, y: y + (25 * i), width, height, padding, skin});        
    }
    this.loadDefender();
    this.startControls();
  }

  moveInvaders() {
    let invaders = viewport.get('invader');
    let acceletarion = 0.02;
    for (let invader of invaders) {
      let calc = Math.sin(this.invadersMomentum) * 2;
      invader.x += calc;
      invader.y += acceletarion;
    }
    this.invadersMomentum += 0.06;
  }
}

let space = new Universe();
space.preload();
space.render();
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
*/
