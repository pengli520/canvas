/*
 * @Author: your name
 * @Date: 2021-01-14 17:28:53
 * @LastEditTime: 2021-01-15 13:57:10
 * @LastEditors: Please set LastEditors
 * @Description: gif生成器
 * @FilePath: \canvas\src\js\generateGif.js
 */

const GIF = (imgList, w, h, callbacl) => {
    return gifshot.createGIF({
        gifWidth: w,
        gifHeight: h,
        images: imgList || ['./img/1.png', './img/2.png', './img/3.png'],
        interval: 0.02,
        numFrames: 1,
        frameDuration: 1,
        fontWeight: 'normal',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        fontColor: '#ffffff',
        textAlign: 'center',
        textBaseline: 'bottom',
        sampleInterval: 100,
        numWorkers: 2
    }, function (obj) {
        if (!obj.error) {
            var image = obj.image,
                animatedImage = document.createElement('img');
            animatedImage.src = image;
            document.body.appendChild(animatedImage);
            callbacl(imgList)
        }
    });
}


export {
    GIF
}