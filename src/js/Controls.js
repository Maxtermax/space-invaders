import JoyStick from './components/JoyStick.js';
import { calcCenter, isOverLapping } from './utils/index.js';

export default class Controls {
  constructor({ctx, viewport, canvas}) {
    let x = 0;
    let y = viewport.y + viewport.height + 30
    let height = canvas.height - viewport.height;
    let width = canvas.width;
    this.canvas = canvas;
    this.joystick = new JoyStick({ctx,  x,  y,  height,  width, fire: 'red', left: 'red', right: 'red' });
    this.viewport = viewport;
  }

  renderJoyStick() {
    this.joystick.render();      
  }
    
  startControls() {
    this.keyEvents();
    this.controls();
    this.joystick.render();    
  }

  keyEvents() {
    const KeySpace = 32;
    const keyLeft = 37;
    const keyRigth = 39;
    const momentum = 10 + Math.random();
    const { viewport } = this;
    let defender = viewport.get('defender')[0]; 
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
    const { viewport, canvas } = this;
    let defender = viewport.get('defender')[0];
    const momentum = 10 + Math.random();    
    canvas.addEventListener('mousedown', (e) => {
      let data = canvas.getBoundingClientRect();
      let x = e.clientX - data.x;
      let y = e.clientY - data.y;
      let overFire = isOverLapping({x, y, height: 20, width: 20}, this.joystick.fireData);
      let overRigth = isOverLapping({x, y, height: 20, width: 20}, this.joystick.rigthData);      
      let overLeft = isOverLapping({x, y, height: 20, width: 20}, this.joystick.leftData);      
      if(overFire) {
        this.joystick.fireData.color = 'rgba(255, 255, 255, 0.5)';
         defender.addBullet({ y: defender.y });
      }

      if(overRigth) {
        this.joystick.rigthData.color = 'rgba(255, 255, 255, 0.5)';
        if ((defender.x + defender.width) >= viewport.width + viewport.x) return;
        defender.x += momentum;        
      }
      if(overLeft) {
        this.joystick.leftData.color = 'rgba(255, 255, 255, 0.5)';
        if ((defender.x + defender.width - 20) <= viewport.x) return;
        defender.x -= momentum;
      }
    })

    canvas.addEventListener('mouseup', (e) => {
      setTimeout(() => {
        this.joystick.fireData.color = 'white';          
        this.joystick.rigthData.color = 'white';          
        this.joystick.leftData.color = 'white';
      }, 200)      
    })

  }

}