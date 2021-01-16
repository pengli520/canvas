/*
 * @Author: your name
 * @Date: 2021-01-15 09:07:40
 * @LastEditTime: 2021-01-16 17:57:16
 * @LastEditors: Please set LastEditors
 * @Description: 视频处理成图片
 * @FilePath: \canvas\src\js\videoToImg.js
 */
import { createEl, addBody, initCanvas } from '../dom/dom.js'

// 画图
const drawVideoToImg = (video) => {
   if (video.duration == video.currentTime) {
      video.pause()
      return false
   }
   let canvas = createEl('canvas')
   let ctx = canvas.getContext('2d')
   let img = createEl('img')
   canvas.width = video.clientWidth
   canvas.height = video.clientHeight   
   ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
   img.src = canvas.toDataURL('image/jpeg', 1)
   img.onload = () => {
      downImg(img.src, video.currentTime)
   }
}


// 下载图片
const downImg = (src, currentTime) => {
   // 多少时间间隔下载一张图片
   const time = 40
   let a = createEl("a",{href:src})
   // 创建一个单击事件
   let event = new MouseEvent("click");
   // 设置图片名称
   a.download = currentTime || "photo"; 
   // 触发a的单击事件	
   a.dispatchEvent(event);
}





// 初始化视频
const initVideo = (src,currentTime = 1) => {
   const video = createEl('video', { src: "./img/2.mp4", class: 'video', controls: true, })
   addBody(video, '.main')

   // 视频数据加载完成
   video.onloadeddata = () => {
      video.currentTime = currentTime

   }
   // 当播放位置改变时,进度条
   video.ontimeupdate = () => {
      // drawVideoToImg(video)
      console.log('改变', video.currentTime)
   }

   return video
}

export {
   initVideo,
   drawVideoToImg
}