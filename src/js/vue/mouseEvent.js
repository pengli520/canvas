/*
 * @Author: your name
 * @Date: 2021-01-18 11:21:19
 * @LastEditTime: 2021-01-18 12:01:03
 * @LastEditors: Please set LastEditors
 * @Description: dom操作鼠标事件
 * @FilePath: \canvas\src\js\vue\mouse.js
 */
import { ref, watch } from "../../../dependencies/vue.esm-browser.js";
const mouseEvent = () => {
    // 是否按下
    let status = ref(false)
    // 滑块的距离
    let distance = ref(0)
    // 滑块坐标变换情况
    let x = ref(0)

    const mousedown = () => {
        status.value = true
    }
    const mouseup = () => {
        status.value = false
    }
    const mouseleave = () => {
        status.value = false
    }
  

    return {
        mousedown,
        mouseup,
        mouseleave,
        status,
        distance,
        x,
    }
}
const dataWatch = (x, distance, timeline, timelineArea) => {
    watch((e) => x.value, (newValue, oldValue) => {
        if (newValue > oldValue 
            && distance.value <= (timeline.clientWidth - timelineArea.clientWidth)) {
            distance.value++
        } else {
            if (distance.value > 0) {
                distance.value--
            }
        }
    })
}
const clearPreventDefault = (el, eventName) => {
    el.addEventListener(eventName, (e) => {
        e.preventDefault()
    })
}
export {
    dataWatch,
    mouseEvent,
    clearPreventDefault
}