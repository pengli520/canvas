/*
 * @Author: your name
 * @Date: 2021-01-14 17:28:53
 * @LastEditTime: 2021-01-19 17:12:14
 * @LastEditors: Please set LastEditors
 * @Description: gif生成器
 * @FilePath: \canvas\src\js\generateGif.js
 */

 /**
  * 
  * @param {*} imgList 临时文件地址
  * @param {*} w gif宽高
  * @param {*} h 高
  * @param {*} callbacl 回调函数
  * @param {*} interval 多少时间间隔换一张图
  * @param {*} frameDuration 每帧停留的时间（10 = 1s）
  * @param {*} numFrames 注意：每100毫秒捕获一次一个视频以及现有图像
  */
const GIF = (imgList, w, h, callbacl, interval = 0.1) => {
    return gifshot.createGIF({
        gifWidth: w,
        gifHeight: h,
        images: imgList,
        interval,
        numFrames: 10,
        frameDuration: 2,
        fontWeight: 'normal',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        fontColor: '#ffffff',
        textAlign: 'center',
        textBaseline: 'bottom',
        sampleInterval: 10,
        numWorkers: 2
    }, function (obj) {
        if (!obj.error) {
            var image = obj.image,
                animatedImage = document.createElement('img');
            animatedImage.src = image;
            document.body.appendChild(animatedImage);
            callbacl ? callbacl() : false
            clearUrl(imgList)
        }
    });
}

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

// 创建临时路径
const createURL = (blob) => {
    return window.URL.createObjectURL(blob)
} 
// 释放文件
const clearUrl = (list) => {
    for (let i of list) {
      window.URL.revokeObjectURL(i)
    }
    console.log('释放文件')
  }
export {
    GIF,
    base64ToBolb,
    createURL,
    clearUrl
}