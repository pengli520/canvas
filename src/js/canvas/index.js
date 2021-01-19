/*
 * @Author: your name
 * @Date: 2021-01-19 14:20:04
 * @LastEditTime: 2021-01-19 17:11:42
 * @LastEditors: Please set LastEditors
 * @Description: canvas相关操作
 * @FilePath: \canvas\src\js\canvas\index.js
 */
import { base64ToBolb, GIF, clearUrl , createURL } from '../gif/generateGif.js'
// 画二阶曲线路径
const curvePath = (ctx, p0, p1, p2, color = 'blue') => {
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = color
    ctx.moveTo(p0.x, p0.y)
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.stroke()
}

/**
 * 画正方形
 * @param {*} ctx 
 * @param {*} rgba 
 * @param {*} item {x,y}坐标
 * @param {*} r 
 */
const drawRect = (ctx, rgba, item, r) => {
    ctx.beginPath()
    ctx.fillStyle = rgba
    ctx.fillRect(item.x, item.y, r, r)
    ctx.fill()
}

/**
 * 画圆
 * @param {*} ctx 
 * @param {*} rgba 
 * @param {*} item {x,y}坐标
 * @param {*} r 
 */
const drawRound = (ctx, rgba, item, r) => {
    ctx.beginPath()
    ctx.fillStyle = rgba
    ctx.arc(item.x, item.y, r, 0, Math.PI * 2, false)
    ctx.fill()
}

// 随机生成英文字母
const randomEnglish = () => {
    let english = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let num = Math.ceil(Math.random() * 25)
    return {
        text: english[num],
        num
    }
}

// 写文本
const writeText = (ctx, rgba, item, size) => {
    const { text, num } = randomEnglish()
    // ctx.rotate( num*(Math.PI / 180));
    ctx.fillStyle = rgba
    ctx.font = `${num / 2}px Arial`;
    ctx.fillText(text, item.x, item.y);
}


/**
 * 创建像素
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 */
const creatImageData = (ctx, width, height) => {
    let imageData = ctx.createImageData(width, height);
    return imageData
}

// 随机数正整数
const randomNum = (num = 100) => {
    return Math.ceil(Math.random() * num)
}

// 二阶曲线公式 p0, p1, p2 三个点的坐标
const curveFormula = (p0, p1, p2, t) => {
    // 获取两个点之前的运动轨迹
    const coordinates = (t) => {
        let x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x
        let y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y
        return {
            x,
            y
        }
    }
    return coordinates(t)
}

// 获取图片rgba 坐标，延迟时间
const getImgData = (ctx, canvas) => {
    let length = canvas.width * canvas.height;
    const myImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let info = []

    // 跨几倍像素
    const multiple = 8
    // p1 随机数
    const p1Random = 2 || Math.random()
    for (let i = 0; i < length * 4; i += 4 * multiple) {
        // 灰度
        let r = myImage.data[i];
        let g = myImage.data[i + 1];
        let b = myImage.data[i + 2];
        let gray = parseInt((r + g + b) / 3);

        let x = i / 4 % canvas.width
        let y = +(i / 4 / canvas.width).toString().split('.')[0]
        let p0 = {
            x: canvas.width / 2,
            y: canvas.height,
        };
        let p2 = {
            x,
            y,
        };
        let p1 = {
            x: (p0.x - x) / p1Random,
            y: (p0.y - y) / p1Random
        };
        // 获取xy，色值
        info.push({
            r,
            g,
            b,
            a: randomNum(255),
            x,
            y,
            p0,
            p2,
            p1,
            t: 0,
            delay: Math.ceil(4000 / 16.66) * Math.random(),
            curDelay: 0,
        })

    }
    return info
}


// 开始表演
const drawAnimation = (ctx,data,canvasCopy) => {
    // 临时lob文件
    const tempFiles = []
    // 圆半径，正方形宽高
    let RAF
    // 17毫秒 执行一次循环 加入事件循环
    const dong = () => {
      let isOver = 0
      ctx.clearRect(0,0,canvasCopy.width,canvasCopy.height);
  
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
          drawRound(ctx, rgba, curItem, r)
          // drawRect(ctx, rgba, curItem, r)
          // writeText(ctx, rgba, curItem, r)
        } else {
          isOver++     
          drawRound(ctx, rgba, item, r) 
          // drawRect(ctx, rgba, item, r)
          // writeText(ctx, rgba, item, r)
          // console.log(isOver, item)
        } 
        // 所以粒子都执行完成
        if (isOver >= data.length) {
          console.timeEnd()
          console.log('结束', data, '帧')
          GIF(tempFiles,canvasCopy.width, canvasCopy.height)
          return cancelAnimationFrame(RAF)
        }          
      }
      // 获取数据
      const base64 =  canvasCopy.toDataURL('image/jpg')
      const url =  createURL(base64ToBolb(base64))
      tempFiles.push(url)
  
      RAF = requestAnimationFrame(dong)
      
    }
    dong()
  }

// 单个无动画
const singleton = (ctx, info, canvas) => {
    for (let item of info) {
        let rgba  = `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`; 
        drawRound(ctx, rgba, item, randomNum(2)) 
    }
    return createURL(base64ToBolb(canvas.toDataURL('image/jpg')))
}

export {
    getImgData,
    randomNum,
    drawRound,
    curveFormula,
    drawAnimation,
    singleton
}