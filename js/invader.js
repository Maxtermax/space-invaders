export default class Invaders {
    constructor(ctx, width, height, x, y, color = 'red') {
       this.width = width;
       this.height = height;
       this.x = x;
       this.y = y;
       this.ctx = ctx;
       this.color = color;
    }

    render() {
       let { width, height, x, y, ctx, color } = this;
       ctx.beginPath();
       ctx.fillStyle = color;         
       ctx.fillRect(x, y, width, height);
       ctx.closePath();
    }
}