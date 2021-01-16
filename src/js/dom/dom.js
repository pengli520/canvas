/*
 * @Author: your name
 * @Date: 2021-01-15 09:21:38
 * @LastEditTime: 2021-01-16 17:57:04
 * @LastEditors: Please set LastEditors
 * @Description: dom操作
 * @FilePath: \canvas\src\js\dom.js
 */

const createEl = (tag, props) => {
    const el = document.createElement(tag)
    for (let key in props) {
        el.setAttribute(key, props[key])
    }
    // img.setAttribute('crossOrigin', 'anonymous')
    return el
}
// 添加到dom
const addBody = (el, parent) => {
    parent ? document.querySelector(parent).appendChild(el) : document.body.appendChild(el)
}
// 初始化canvas
const initCanvas = (props) => {
    const canvas = createEl('canvas', props)
    const ctx = canvas.getContext("2d");
    return {
        canvas,
        ctx
    }
}

export {
    createEl,
    addBody,
    initCanvas
}
