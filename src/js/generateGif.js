/*
 * @Author: your name
 * @Date: 2021-01-14 17:28:53
 * @LastEditTime: 2021-01-14 17:44:07
 * @LastEditors: Please set LastEditors
 * @Description: gif生成器
 * @FilePath: \canvas\src\js\generateGif.js
 */

gifshot.createGIF({
    gifWidth: 200,
    gifHeight: 200,
    // images: [
    //   'https://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1586855265&t=bda8700df538f6be8b0158c0a7f8f7df',
    //   'https://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1586855265&t=6afcc905d3890e2e10910155fb7c73ed',
    // ],
    images: ['./img/1.png', './img/2.png', './img/3.png'],
    interval: 0.1,
    numFrames: 10,
    frameDuration: 1,
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
    }
});



const convertBase64UrlToBlob = (a) => {
    let arr = a.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    console.log(bstr)
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    let b = []
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
      b.push(bstr.charCodeAt(n))
    }
    console.log(b)
    return new Blob([u8arr], { type: mime })      
  }
  let str = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABnCAYAAADygzfHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADzSURBVHhe7dExAQAADMOg+Tfd2eAIFriFVAyqGFQxqGJQxaCKQRWDKgZVDKoYVDGoYlDFoIpBFYMqBlUMqhhUMahiUMWgikEVgyoGVQyqGFQxqGJQxaCKQRWDKgZVDKoYVDGoYlDFoIpBFYMqBlUMqhhUMahiUMWgikEVgyoGVQyqGFQxqGJQxaCKQRWDKgZVDKoYVDGoYlDFoIpBFYMqBlUMqhhUMahiUMWgikEVgyoGVQyqGFQxqGJQxaCKQRWDKgZVDKoYVDGoYlDFoIpBFYMqBlUMqhhUMahiUMWgikEVgyoGVQyqGFQxqGJQxaCKIW0PphiNZoUfnkgAAAAASUVORK5CYII='
  let src = window.URL.createObjectURL(convertBase64UrlToBlob(str))
  addBody(createEl('img', {src}))