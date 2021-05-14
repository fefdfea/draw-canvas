const canvas = document.querySelector('#jsCanvas');
const fill = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave')
const btn = document.querySelector('.controls_colors');
const ctx = canvas.getContext('2d');
const range = document.querySelector('#jsRange');

const width = document.querySelector('#jsCanvas').offsetWidth;
const height = document.querySelector('#jsCanvas').offsetHeight;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,width,height);
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;
let fillIng = false;

function fullColor() {
  if( fillIng ){
    full();
  }
}

function full() {
  ctx.fillRect(0,0,width,height);
}

function colorPick(e) {
  const target = e.target;
  const background = target.style.backgroundColor;
  ctx.strokeStyle = background;
  ctx.fillStyle = background;
}

function img_save() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement('a');
  link.href = image;
  link.download = 'paintJs';
  link.click();
}


function onMouseMove(e) {
  const offsetX = e.offsetX;
  const offsetY = e.offsetY;
  if ( !fillIng ){
    if(!painting){
      ctx.beginPath();
      ctx.moveTo(offsetX,offsetY);
    }else{
      ctx.lineTo(offsetX,offsetY);
      ctx.stroke()
    }
  }
}

function  startPainting(){
  painting = true;
}

function stopPainting() {
  painting = false;
}

function mousedown () {
  stopPainting()
}

function mouseUp() {
  stopPainting()
}

function rangeFn(e) {
  const value = e.target.value;
  ctx.lineWidth = value;
}

function changeFill() {
  let text = document.querySelector('#jsMode');
  if( text.innerText === 'FILL' ){
    fillIng = true;
    fill.innerText = 'PAINT';
  }else{
    fillIng = false;
    fill.innerText = 'FILL';
  }
}

if ( range ){
  range.addEventListener('input',rangeFn);
}

if ( fill ){
  fill.addEventListener('click',changeFill)
}

if ( canvas ) {
  canvas.addEventListener('mousemove',onMouseMove);
  canvas.addEventListener('mousedown',startPainting);
  canvas.addEventListener('mouseup',stopPainting);
  canvas.addEventListener('mouseleave',stopPainting);
  canvas.addEventListener('click',fullColor);
}

btn.addEventListener('click',colorPick);
save.addEventListener('click',img_save)
