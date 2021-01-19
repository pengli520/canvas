/*
 * @Author: your name
 * @Date: 2021-01-11 17:41:40
 * @LastEditTime: 2021-01-19 15:37:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\index.js
 */
import {createEl,addBody,initCanvas} from './dom/dom.js'
import "./vue/index.js";
import { getImgData,  drawAnimation } from './canvas/index.js'
console.time()

const { canvas, ctx } = initCanvas();
const img = createEl('img', { src: './img/1.jpg' })


img.onload = () => {
  canvas.width = img.width
  canvas.height = img.height
  canvas.style.background = "#000" 
  ctx.drawImage(img, 0, 0)
  const info = getImgData(ctx, canvas)
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawAnimation(ctx, info, canvas)
}

addBody(canvas)




