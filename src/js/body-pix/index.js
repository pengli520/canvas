/*
 * @Author: your name
 * @Date: 2021-01-22 14:03:28
 * @LastEditTime: 2021-01-22 14:37:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\body-pix\index.js
 */

import { addBody, createEl} from '../dom/dom.js'
import { canvasToBase64ToBolbUrl } from '../canvas/index.js';

// 初始化
const bodyPixLoad =  () => {
    return bodyPix.load({
        architecture: 'ResNet50',
        outputStride: 16,
        quantBytes: 2
    });

}

/**
 * 
 * @param {*} net bodyPix实列
 * @param {*} src 图片src
 * @param {*} backFn 回调函数
 */
const initBodyPix = async (net, src, backFn) => {
    if (!src) {
        throw 'img src no empty'
    }

    const img = createEl('img', {src})
    img.onload = async () => {
        const segmentation = await net.segmentPerson(img);
        const coloredPartImage = bodyPix.toMask(segmentation);
        const opacity = 1;
        const flipHorizontal = false;
        const maskBlurAmount = 0;
    
        const canvas = createEl('canvas')
    
        bodyPix.drawMask(canvas, img, coloredPartImage, opacity, maskBlurAmount,flipHorizontal);
        let url = canvasToBase64ToBolbUrl(canvas)
        backFn(url)
    }
}


export {
    bodyPixLoad,
    initBodyPix
}