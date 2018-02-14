export const calcCenter = (container, item) => {
  let x = container.x + (container.width / 2) - (item.width / 2);
  let y = container.y + (container.height / 2) - (item.height / 2);
  return { y, x }
}

export const isOverLapping = (a, b) => {
  let x = (a.x >= b.x) && (a.x <= b.x+b.width);
  let y = (a.y >= b.y) && (a.y <= b.y + b.height);
  return x && y;
}

export const clear = (canvas) => canvas.width = canvas.width;

export const hover = (element = window, cb) => {
  element.addEventListener('mousemove', function (e) {
    let data = element.getBoundingClientRect();
    let x = e.clientX - data.x;
    let y = e.clientY - data.y;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    cb({ x, y });
  })
}