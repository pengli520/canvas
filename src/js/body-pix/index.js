/*
 * @Author: your name
 * @Date: 2021-01-22 14:03:28
 * @LastEditTime: 2021-01-22 14:37:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\body-pix\index.js
 */

import { addBody, createEl} from '../dom/dom.js'

const initBodyPix = async () => {
    const net = await bodyPix.load({
        architecture: 'ResNet50',
        outputStride: 16,
        quantBytes: 2
    });
    const img = createEl('img', {src: './img/7.jpg'})
    img.onload = async () => {
        const segmentation = await net.segmentPerson(img);
        const coloredPartImage = bodyPix.toMask(segmentation);
        const opacity = 1;
        const flipHorizontal = false;
        const maskBlurAmount = 0;
    
        const canvas = createEl('canvas')
    
        addBody(canvas)
        // console.log(segmentation, coloredPartImage);
        bodyPix.drawMask(canvas, img, coloredPartImage, opacity, maskBlurAmount,flipHorizontal);
        console.timeEnd()
    }
}


export {
    initBodyPix
}