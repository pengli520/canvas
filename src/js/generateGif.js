/*
 * @Author: your name
 * @Date: 2021-01-14 17:28:53
 * @LastEditTime: 2021-01-14 17:44:07
 * @LastEditors: Please set LastEditors
 * @Description: gif生成器
 * @FilePath: \canvas\src\js\generateGif.js
 */

const GIF = (imgList) => {
    return gifshot.createGIF({
        gifWidth: 200,
        gifHeight: 200,
        images: imgList || ['./img/1.png', './img/2.png', './img/3.png'],
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
}




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

export {
    GIF
}