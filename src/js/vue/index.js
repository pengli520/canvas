/*
 * @Author: your name
 * @Date: 2021-01-18 09:19:04
 * @LastEditTime: 2021-01-18 15:46:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\vue\index.js
 */

import { createApp, ref, watch, nextTick, onMounted, computed } from "../../../dependencies/vue.esm-browser.js";
import { addBody} from '../dom/dom.js'
import { dataWatch, mouseEvent, clearPreventDefault } from "./mouseEvent.js";
import { initVideo, drawVideoToImg } from '../video/videoToImg.js'

createApp({
    setup() {
        const { mousedown, mouseup, mouseleave, status, distance, x } = mouseEvent()
        const { mousedown: stretchMousedown, mouseup: stretchMouseup, mouseleave: stretchMouseleave, status: stretchStatus } = mouseEvent()
        let video
        // 时间轴
        let timeline = ref(null);
        // 区域范围
        let timelineArea = ref(null);
        // 区域时长
        let areaTime = computed(() => {
            return Math.ceil(timelineArea.value.clientWidth / timeline.value.clientWidth * video.duration)
        })

        const mousemove = (e) => {
            if (status.value) {
                x.value = e.x
                timelineArea.value.style.marginLeft = `${distance.value}px`
                video.currentTime = Math.ceil(distance.value / timeline.value.clientWidth * video.duration)
                console.log('当期的秒数:', video.currentTime, '区域时长:', areaTime)
            }
        }   
        const stretchMousemove = (e) => {
            if (stretchStatus.value) {
                let clientWidth = timelineArea.value.clientWidth
                let width = clientWidth+=1
                timelineArea.value.style.width = width + 'px'
            }
        }
        const init = () => {
            video = initVideo('./img/2.mp4')
            addBody(video, '.main')
            console.log(video)
            dataWatch(x, distance, timeline.value, timelineArea.value)
            clearPreventDefault(document, 'mousemove')
        }
        const generateImg = () => {
            video.areaTime = areaTime.value
            video.status = true
            drawVideoToImg(video, (base64ImgArr) => {
                console.dir(video)
                console.log(base64ImgArr)
            })

        }
        onMounted(() => {
            init()
        })


        return {
            mousemove,
            mousedown,
            mouseup,
            mouseleave,
            timeline,
            timelineArea,
            stretchMouseup,
            stretchMousedown,
            stretchMousemove,
            stretchMouseleave,
            generateImg,
        }
    }
}).mount('#app')

