import TextBox from './components/TextBox.js';
import Explotion from './Explotion.js';
import { isOverLapping } from './utils/index.js';
const Shoot = document.getElementById('shoot');

export default class SpaceShip {
  constructor(ctx, width, height, x, y, color = 'red', elements = [], viewport, type = 'invader', skin) {
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
    this.skin = skin;
    this.stime = 0;
    this.skinType = 'a';   
  }

  addBullet(data = {}) {
    let bulletWidth = 2;
    let bulletHeight = 35;
    let owner = this;
    let {
      x = this.x + (this.width / 2) - (bulletWidth / 2),
      y = this.y + this.height 
    } = data;
    if(this.type === 'defender') y = this.y-bulletHeight+10;
    let text = new TextBox(this.ctx, x, y, `y=${y}`, '12px arial', true);
    this.bullets.push({ bulletWidth, bulletHeight, x, y, text, owner, type: 'bullet', tail: 0 }); 
    //if(this.type === 'defender')
     this.viewport.elements.push(new Explotion({
       ctx: this.ctx, 
       x: this.x+(this.width/2), 
       y: this.y,
       r: 2,
       duration: 100,
       color: {
         r: 255, 
         g:255, 
         b: 255         
       }
     }));    
    Shoot.play();   
  }

  updateBullets() {
    let { ctx, bullets, viewport } = this;
    this.bullets = bullets.filter(({ bulletHeight, y, x }) => {
      if (this.type === 'defender' && y <= 0) return false;
      if(y + bulletHeight <= (viewport.y + viewport.height)) return true;
    })
  }

  drawBullets(debug = false) {
    let { ctx, bullets, type, x, y, height, width, viewport } = this;     
    for (let bullet of bullets) {
      let { bulletWidth, bulletHeight, x, y, text, tail } = bullet;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      if(tail < bulletHeight) bullet.tail += 4;
      let gradient = ctx.createLinearGradient(x, y, x, y+tail);      
      if(type === 'invader') {         
         gradient.addColorStop(0, '#000b28');                
         gradient.addColorStop(1, 'white');
      } else {
         gradient.addColorStop(0, 'white');
         gradient.addColorStop(1, '#000b28');        
      }
      ctx.fillStyle = gradient;
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
    let fireRate = 0.7;    
    if(invaders.length < 15) fireRate = 0.5;
    if(invaders.length < 5) fireRate = 0.1;    
    return invaders.every(invader => Math.random() < fireRate);
  }

  checkCollition(bullet, index, entire, item, i, all) {
    let { viewport, ctx } = this;
    if (isOverLapping(bullet, item)) {
      entire.splice(index, 1);//drop bullet
      //if(item.type !== 'defender' || item.type !== 'invader') return;
      item.color = 'orange';
      if (item.points - 1 === 0) item.color = 'red';
      item.points--;
      viewport.elements.push(new Explotion({ctx, x: bullet.x, y: bullet.y}));
      return true;
    }
  }

  bulletCollision(items) {
    let { bullets, viewport, ctx } = this;
    bullets.some((bullet, index, entire) => {
      return items.some(this.checkCollition.bind(this, bullet, index, entire))
    })

    items.filter(others => others.type !== this.type && others.bullets.length && bullets.length).some((others, pos, all) => {
       if(others.bullets.length > bullets.length) {
         others.bullets.some((othersBullet, otherIndex, othersBullets) => {
           return bullets.some((currentBullets, currentBulletIndex, allBullets) => {
             let result = isOverLapping(othersBullet, currentBullets);
             if(result) { 
                othersBullets.splice(otherIndex, 1);
                allBullets.splice(currentBulletIndex, 1);   
                viewport.elements.push(new Explotion({ctx, x: othersBullet.x, y: othersBullet.y}));             
             }
             return result;
           })
         })        
       } else {
         bullets.some((currentBullets, currentBulletIndex, allBullets) => {
            return others.bullets.some((othersBullet, otherIndex, othersBullets) => {
              let result = isOverLapping(currentBullets, othersBullet)
              if(result) {
                othersBullets.splice(otherIndex, 1);
                allBullets.splice(currentBulletIndex, 1);
                viewport.elements.push(new Explotion({ctx, x: othersBullet.x, y: othersBullet.y}));       
              }
              return result;
            });
         })                 
       }
    })
    
  }

  render() {
    let { width, height, x, y, ctx, color, skin, type, stime, skinType } = this;
    ctx.beginPath();    
    //ctx.strokeStyle = color;
    if(type === 'defender') {
      ctx.fillStyle = 'white';
      ctx.fillRect(x, y, width, height);
    }
    if(type === 'invader') {   
      if(this.skinType === 'b') ctx.drawImage(skin, 20+110+36, 14, 110, 80, x, y, width, height);          
      if(this.skinType === 'a') ctx.drawImage(skin, 20, 14, 110, 80, x, y, width, height);          
    }
    ctx.closePath();
    this.updateBullets();
    this.drawBullets(false);
    if (this.type === 'invader' && this.shouldFire()) {
      this.addBullet();
    }
    this.fire();
  }
}