/*
 * @Author: your name
 * @Date: 2021-01-11 17:41:40
 * @LastEditTime: 2021-01-12 16:36:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\index.js
 */
console.time()
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

// 写文本
const writeText =  (ctx, rgba, item, size) => {
  const {text, num} = randomEnglish()
  // ctx.rotate( num*(Math.PI / 180));
  ctx.fillStyle = rgba
  ctx.font=`${num / 2}px Arial`;
  ctx.fillText(text,item.x,item.y);
}

// 随机生成英文字母
const randomEnglish = () => {
  let english = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  let num = Math.ceil(Math.random() * 25)
  return {
    text: english[num],
    num
  }
}

// 随机数
const randomNum = (num=100) => {
  return Math.ceil(Math.random() * num)
}


// 画正方形
const drawRect = (ctx, rgba, item, r) => {
  ctx.beginPath()
  ctx.fillStyle = rgba
  ctx.fillRect(item.x, item.y, r, r)
  ctx.fill()
}

// 画圆
const drawRound = (ctx, rgba, item, r) => {
  ctx.beginPath()
  ctx.fillStyle = rgba
  ctx.arc(item.x, item.y, r, 0, Math.PI * 2, false)
  ctx.fill()
}

// 开始表演
const draw = (ctxCopy,data) => {
  let r = randomNum(100);
  // for (let i = 0; i < data.length; i += randomNum(20)) {
  //   let item = data[i]
  //   let rgba  = `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`;

  //   // drawRect(ctxCopy, rgba, item, r)
  //   // drawRound(ctxCopy, rgba, item, r)
  //   // writeText(ctxCopy, rgba, item, r)

  //   curveFormula(item.p0,item.p1,item.p2, {ctxCopy, rgba, item, r})
  // }

  let i = 0
  const dong = () => {
    if (i >= data.length) {
      cancelAnimationFrame(a)
    }
    i += randomNum(20)
    let item = data[i]
    let rgba  = `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`;   
    curveFormula(item.p0,item.p1,item.p2, {ctxCopy, rgba, item, r})
    // drawRound(ctxCopy, rgba, item, r) 
    let a = requestAnimationFrame(dong)
  }
  dong()
}

// 画二阶曲线路径
const curvePath = (ctx, p0,p1,p2,color = 'blue') => {
  ctx.beginPath()
  ctx.lineWidth=1;
  ctx.lineCap="round";
  ctx.strokeStyle = color
  ctx.moveTo(p0.x,p0.y)
  ctx.quadraticCurveTo(p1.x,p1.y,p2.x,p2.y);
  ctx.stroke()
}

// 运动物体

// 二阶曲线公式 p0, p1, p2 三个点的坐标
const curveFormula = (p0, p1, p2, data) => {
  let {ctxCopy, rgba, item, r} = data
  let arr = []
  // 获取两个点之前的运动轨迹
  const coordinates = (t) => {
    let x = (1-t)*(1-t)*p0.x+2*t*(1-t)*p1.x+t*t*p2.x
    let y = (1-t)*(1-t)*p0.y+2*t*(1-t)*p1.y+t*t*p2.y
    return {
      x,
      y
    }
  }

    let t = 0
    let a
  const dong = () => {
    if (t >= 1) {
      cancelAnimationFrame(a)
    }
    t += 0.01
    drawRound(ctxCopy, rgba, coordinates(t), r) 
     a = requestAnimationFrame(dong)
  }
  dong()
  // for (let t = 0;t < 1; t += 0.1) {
  //   const dong = () => {
  //     drawRound(ctxCopy, rgba, coordinates(t), r) 
  //     let a = requestAnimationFrame(dong)
  //   }
  //   dong()
  // }
  return arr
}

// 创建线程
// createWork({length, myImage, info, width: canvas.width, height: canvas.height})

const createWork = (data) => {
  const worker = new Worker('http://127.0.0.1:5502/src/js/work.js');
  worker.postMessage(data)
  worker.onmessage = function (event) {
    console.log(event.data);
    draw(ctxCopy, event.data)
  }
  worker.addEventListener('error', function (event) {
    console.log(event)
  });
}
// 获取图片数据
const getImgData = (ctx, canvas) => {
  let length = canvas.width * canvas.height;
  const myImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let info = []
  const copyImgData = creatImageData(ctx)


  for (let i = 0; i < length * 4; i += 4 * 5) {
    // 灰度
    let myRed = myImage.data[i];
    let myGreen = myImage.data[i + 1];
    let myBlue = myImage.data[i + 2];
    let myGray = parseInt((myRed + myGreen + myBlue) / 3);

    let x = i / 4 % canvas.width
    let y = +( i / 4 / canvas.width).toString().split('.')[0]
    let p0 = {
      x: canvas.width / 2,
      y: img.height,
    };
    let p2 = {
      x,
      y,
    };
    let p1 = {
      x: (p0.x - x ) / 2,
      y: (p0.y - y) / 2
    };
    // 获取xy，色值
    info.push({
      r:myGray,
      g:myGray,
      b:myGray,
      a:255,
      x,
      y,
      p0,
      p2,
      p1,
      // arr: curveFormula(p0,p1,p2)    
    })

  }
  console.log(info)
  draw(ctxCopy, info)
  console.timeEnd()

}

const { canvas, ctx } = initCanvas();
const { canvas: canvasCopy, ctx:ctxCopy } = initCanvas();
const img = createEl('img', { src: './img/3.jpg' })

img.onload = () => {
  canvas.width = img.width
  canvas.height = img.height
  canvasCopy.width = img.width
  canvasCopy.height = img.height
  canvas.style.background = "#000"
  ctx.drawImage(img, 0, 0)

  getImgData(ctx, canvas)
}

addBody(canvas)
addBody(canvasCopy)


// let p0 = {x:0,y:0}
// let p1 = {x:120,y:100}
// let p2 = {x:200,y:50}	
// let arr = curveFormula(p0,p1,p2)
// console.log(arr, '---')