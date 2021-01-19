/*
 * @Author: your name
 * @Date: 2021-01-19 14:27:04
 * @LastEditTime: 2021-01-19 14:27:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\worker\index.js
 */
// 创建线程
// createWork({length, myImage, info, width: canvas.width, height: canvas.height})
const createWork = (data) => {
    const worker = new Worker('http://127.0.0.1:5502/src/js/worker/work.js');
    worker.postMessage(data)
    worker.onmessage = function (event) {
      console.log(event.data);
      drawAnimation(ctxCopy, event.data)
    }
    worker.addEventListener('error', function (event) {
      console.log(event)
    });
  }