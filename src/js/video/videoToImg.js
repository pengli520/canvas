/*
 * @Author: your name
 * @Date: 2021-01-15 09:07:40
 * @LastEditTime: 2021-01-18 15:45:11
 * @LastEditors: Please set LastEditors
 * @Description: 视频处理成图片
 * @FilePath: \canvas\src\js\videoToImg.js
 */
import { createEl, addBody, initCanvas } from '../dom/dom.js'

// 画图 video.status 为true, 代表事件操作， 为false：ontimeupdate事件触发
const drawVideoToImg = (video, backFn) => {
   if (backFn) {
      base64.backFn = backFn
   }
   console.log(video.areaTime, 'areaTime----')
   if (video.duration == video.currentTime || !video.status) {
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
      transformImg(img.src, video)
   }
}
// 下载图片
const drawImg = (src, video) => {
   let a = createEl("a",{href:src})
   // 创建一个单击事件
   let event = new MouseEvent("click");
   // 设置图片名称
   a.download = video.currentTime || "photo"; 
   // 触发a的单击事件	
   a.dispatchEvent(event);
}

// 图片处理
const transformImg = (src, video, timeInterval = 1) => {
   base64.push(src)
   if (video.areaTime) {
      video.areaTime--
      video.currentTime+= timeInterval
   } else {
      video.status = false
      base64.backFn(base64.imgArr)
      base64.clear()
   }
}


// 返回图片数据
const base64 = {
   imgArr: [],
   push(obj) {
      this.imgArr.push(obj)
   },
   clear() {
      this.imgArr = []
   },
   backFn: null
}


// 初始化视频
const initVideo = (src,currentTime = 10) => {
   const video = createEl('video', { src, class: 'video', controls: true, })

   // 视频数据加载完成
   video.onloadeddata = () => {
      video.currentTime = currentTime

   }
   // 当播放位置改变时,进度条
   video.ontimeupdate = () => {
      drawVideoToImg(video)
   }

   return video
}

export {
   initVideo,
   drawVideoToImg
}