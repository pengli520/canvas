/*
 * @Author: your name
 * @Date: 2021-01-11 17:41:40
 * @LastEditTime: 2021-01-14 18:01:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\index.js
 */
import { GIF } from './generateGif.js'
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
const initCanvas = (props) => {
  const canvas = createEl('canvas',props)
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
  return canvasGif.toDataURL('image/jpg');
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

// 随机数正整数
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

// 释放文件
const clearUrl = (list) => {
  for (let i of list) {
    window.URL.revokeObjectURL(i)
  }
  console.log('清除')
}

// 开始表演
const draw = (ctxCopy,data) => {
  // 圆半径，正方形宽高
  let RAF
  // 17毫秒 执行一次循环 加入事件循环
  const dong = () => {
    let isOver = 0

    ctxCopy.clearRect(0,0,canvasCopy.width,canvasCopy.height);

    for (let k = 0; k < data.length; k += 1) {
      let r = randomNum(2);
      let item = data[k]
      let rgba  = `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`; 
      // 延迟发射
      if (item.curDelay < item.delay) {
        item.curDelay++
        continue
      }
      // item.t区间值（0,1）
      if (item.t < 1) {
        item.t += 0.01
        let curItem = curveFormula(item.p0,item.p1,item.p2, item.t)
        drawRound(ctxCopy, rgba, curItem, r)
        // drawRect(ctxCopy, rgba, curItem, r)
        // writeText(ctxCopy, rgba, curItem, r)
      } else {
        isOver++     
        drawRound(ctxCopy, rgba, item, r) 
        // drawRect(ctxCopy, rgba, item, r)
        // writeText(ctxCopy, rgba, item, r)
        // console.log(isOver, item)
      } 
      // 所以粒子都执行完成
      if (isOver >= data.length) {
        console.timeEnd()
        console.log('结束', data, '帧')
        GIF(tempFiles,canvasCopy.width, canvasCopy.height, clearUrl)
        return cancelAnimationFrame(RAF)
      }          
    }
    // 获取数据
    let frame = getImageData(ctxCopy, canvasCopy)
    const base64 =  putColorData(ctxGif, frame)
    const file =  base64ToBolb(base64)
    let src = window.URL.createObjectURL(file) 
    tempFiles.push(src)
    // addBody(createEl('img', {src}))    
    RAF = requestAnimationFrame(dong)
    
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

// 二阶曲线公式 p0, p1, p2 三个点的坐标
const curveFormula = (p0, p1, p2, t) => {
  // 获取两个点之前的运动轨迹
  const coordinates = (t) => {
    let x = (1-t)*(1-t)*p0.x+2*t*(1-t)*p1.x+t*t*p2.x
    let y = (1-t)*(1-t)*p0.y+2*t*(1-t)*p1.y+t*t*p2.y
    return {
      x,
      y
    }
  }
  return coordinates(t)
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

// 获取canvas上的图片数据
const getImageData = (ctx, canvas) => {
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}
// 获取图片数据
const getImgData = (ctx, canvas) => {
  let length = canvas.width * canvas.height;
  const myImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let info = []

  // 跨几倍像素
  const multiple = 20
  // p1 随机数
  const p1Random = 2 || Math.random()
  for (let i = 0; i < length * 4; i += 4 * multiple) {
    // 灰度
    let r = myImage.data[i];
    let g = myImage.data[i + 1];
    let b = myImage.data[i + 2];
    let gray = parseInt((r + g + b) / 3);

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
      x: (p0.x - x )  / p1Random,
      y: (p0.y - y)  / p1Random
    };
    // 获取xy，色值
    info.push({
      r:gray,
      g:gray,
      b:gray,
      a:randomNum(255),
      x,
      y,
      p0,
      p2,
      p1,
      t:0,
      delay: Math.ceil(4000 / 16.66) * Math.random(),
      curDelay: 0,
    })

  }
  draw(ctxCopy, info)
}

const { canvas, ctx } = initCanvas({style: "opacity:0"});
const { canvas: canvasCopy, ctx:ctxCopy } = initCanvas();
const { canvas: canvasGif, ctx:ctxGif } = initCanvas({style: "opacity:0"});
const img = createEl('img', { src: './img/1.jpg' })
// 临时lob文件
const tempFiles = []

img.onload = () => {
  canvas.width = img.width
  canvas.height = img.height
  canvasCopy.width = img.width
  canvasCopy.height = img.height
  canvasGif.width = img.width
  canvasGif.height = img.height
  canvas.style.background = "#000"
  ctx.drawImage(img, 0, 0)

  getImgData(ctx, canvas)
}

addBody(canvas)
addBody(canvasCopy)
addBody(canvasGif)



const base64ToBolb = (base64) => {
  let arr = base64.split(',')
  let type = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let len = bstr.length
  let u8arr = new Uint8Array(len)
  while (len--) {
    u8arr[len] = bstr.charCodeAt(len)
  }
  return new Blob([u8arr], { type })      
}