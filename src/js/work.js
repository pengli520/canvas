/*
 * @Author: your name
 * @Date: 2021-01-12 14:32:47
 * @LastEditTime: 2021-01-12 15:11:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\work.js
 */
// 二阶曲线公式 p0, p1, p2 三个点的坐标
const curveFormula = (p0, p1, p2) => {
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
  
    for (let t = 0;t < 1; t += 0.01) {
          arr.push(coordinates(t))
    }
    return arr
  }

this.addEventListener('message', function (e) {
    console.log(e)
    let {info, length, myImage, width, height} = e.data
    for (let i = 0; i < length * 4; i += 4) {
        // 灰度
        let myRed = myImage.data[i];
        let myGreen = myImage.data[i + 1];
        let myBlue = myImage.data[i + 2];
        let myGray = parseInt((myRed + myGreen + myBlue) / 3);
    
        let x = i / 4 % width
        let y = +( i / 4 / width).toString().split('.')[0]
        let p0 = {
          x: 0,
          y: height,
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
          arr: curveFormula(p0,p1,p2)    
        })
      }
    this.postMessage(info);
  }, false);