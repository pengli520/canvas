const createEl = (tag, props) => {
  const el = document.createElement(tag)
  for (let key in props) {
    el[key] = props[key]
  }
  // img.setAttribute('crossOrigin', 'anonymous')
  return el
}
// 添加到dom
const addBody = (el) => {
  document.body.appendChild(el)
}
// 初始化canvas
const initCanvas = () => {
  const canvas = createEl('canvas')
  const ctx =  canvas.getContext("2d");
  return {
    canvas,
    ctx
  }
}
// 创建像素
const creatImageData = (ctx,width=img.width,height=img.height) => {
  let imageData = ctx.createImageData(width,height);
  return imageData
}
// 把像素点画在画布上
const putColorData = (ctx, data) => {
  ctx.putImageData(data, 0, 0);
}
let i = 1
const getImgData = (ctx, canvas) => {
  const d = i++;
  let length = canvas.width * canvas.height;
  const myImage = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const copyImgData = creatImageData(ctx)
  for (let i = 0; i < length * 4 * d; i += 4*d) {
    let myRed = myImage.data[i];
    let myGreen = myImage.data[i + 1];
    let myBlue = myImage.data[i + 2];
    let myGray = parseInt((myRed + myGreen + myBlue) / 3);
    myImage.data[i] = myGray;
    myImage.data[i + 1] = myGray;
    myImage.data[i + 2] = myGray;

    copyImgData.data[i] = myGray
    copyImgData.data[i+1] = myGray
    copyImgData.data[i+2] = myGray
    copyImgData.data[i+3] = 255
  }
  console.log(myImage, copyImgData)
  putColorData(ctxCopy,  copyImgData)
}

const { canvas, ctx } = initCanvas();
const { canvas: canvasCopy, ctx:ctxCopy } = initCanvas();
const img = createEl('img', { src: './img/1.jpg' })

img.onload = () => {
  canvas.width = img.width
  canvas.height = img.height
  canvasCopy.width = img.width
  canvasCopy.height = img.height
  canvas.style.background = "#000"
  ctx.drawImage(img, 0, 0);

    getImgData(ctx, canvas)

  
}

addBody(canvas)
addBody(canvasCopy)