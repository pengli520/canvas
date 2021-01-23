/*
 * @Author: your name
 * @Date: 2021-01-11 17:41:40
 * @LastEditTime: 2021-01-23 11:54:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\index.js
 */
import {createEl,addBody,initCanvas} from '../dom/dom.js'
import "../index.js";
import { getImgData,  drawAnimation, singleton  } from '../canvas/index.js'


const transformImg =  (imgUrls, backFn) => {
  if (!imgUrls.length) {return}
  console.time()
  const { canvas, ctx } = initCanvas();
  let curIndex = 0 
  let urls = []
  for (let src of imgUrls) {
    const img = createEl('img', { src })
  
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      canvas.style.background = "#000" 
      ctx.drawImage(img, 0, 0)
      const info = getImgData(ctx, canvas)
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // drawAnimation(ctx, info, canvas)
      let url = singleton(ctx, info, canvas)
      urls.push(url)
      curIndex++
      if (curIndex === imgUrls.length) {
        backFn(urls)
      } 
    }

    
  }
}


export {
  transformImg
}






