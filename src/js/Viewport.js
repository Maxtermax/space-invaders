export default class Viewport {
  constructor(element) {
    const scale = 0.75;
    this.ctx = element.getContext('2d');
    this.width = element.width * 0.8;
    this.height = element.height * scale;
    this.x = 0;
    this.y = 0;
    this.elements = [];
  }

  get(id = '') {
    return this.elements.filter(item => item.type === id);    
  }

  render(midlewares = []) {
    let { ctx, x, y, width, height, elements } = this;
    elements.forEach((element, index, entire) => {
      midlewares.forEach(midleware => midleware(element, index, entire));
      element.render();
    })
    //ctx.beginPath();
    //ctx.strokeStyle = 'white';
   // ctx.rect(x, y, width, height);
    //ctx.stroke();
    //ctx.closePath();
  }
}