export default class TextBox {
  constructor(ctx, x, y, data = '', font = '12px roboto') {
    this.ctx = ctx;
    this.font = font;
    this.x = x;
    this.y = y;
    this.data = data;
  }

  destroy() {
    let { ctx, font, x, y, data } = this;
    let text = ctx.measureText(data);
    ctx.clearRect(x, y, text.width, text.emHeightAscent);
  }
  
  render() {
    let { ctx, font, x, y, data } = this;
    ctx.beginPath();
    ctx.save();
    ctx.font = font;    
    ctx.fillStyle = 'white';
    ctx.fillText(data, x, y, 100);
    ctx.restore();
    ctx.closePath();
  }
}