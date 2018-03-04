export default class Viewport {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 650;
    this.height = 400;
    this.x = 0;
    this.y = 10;
    this.elements = [];
  }

  render(midlewares = []) {
    let { ctx, x, y, width, height, elements } = this;
    elements.forEach((element, index, entire) => {
      midlewares.forEach(midleware => midleware(element, index, entire));
      element.render();
    })
    //ctx.beginPath();
    //ctx.strokeStyle = 'red';
    //ctx.rect(x, y, width, height);
    //ctx.stroke();
    //ctx.closePath();
  }
}