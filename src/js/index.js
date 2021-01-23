/*
 * @Author: your name
 * @Date: 2021-01-18 09:19:04
 * @LastEditTime: 2021-01-23 14:22:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\src\js\vue\index.js
 */

import { createApp, ref, watch, nextTick, onMounted, computed } from "../../dependencies/vue.esm-browser.js";
import { addBody, createEl} from './dom/dom.js'
import { dataWatch, mouseEvent, clearPreventDefault } from "./vue/mouseEvent.js";
import { initVideo, drawVideoToImg } from './video/videoToImg.js'
import { GIF, base64ToBolb, createURL } from "./gif/generateGif.js";
import { transformImg } from './gif/index.js'
import { initBodyPix, bodyPixLoad } from "./body-pix/index.js";
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
            return +(timelineArea.value.clientWidth / timeline.value.clientWidth * video.duration).toFixed(2)
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
            video = initVideo('./img/4.mp4')
            addBody(video, '.main')
            console.log(video)
            dataWatch(x, distance, timeline.value, timelineArea.value)
            clearPreventDefault(document, 'mousemove')
        }
        const generateImg = async () => {
            console.time()
            video.areaTime = areaTime.value
            video.status = true
            const net = await bodyPixLoad()
            console.log(net, '---')
            drawVideoToImg(video, (base64ImgArr) => {
                const imgUrls = []
                const backImgUrl = []
                const img = createEl('img',{src: ''})
                addBody(img)
                
                for (let base of base64ImgArr) {
                    let url = createURL(base64ToBolb(base))
                    imgUrls.push(url)
                    // 图片人体分析
                    initBodyPix(net, url, (backUrl) => {
                        backImgUrl.push(backUrl)
                        if (backImgUrl.length === imgUrls.length) {
                            console.log(backImgUrl, '完成人体分析')
                            transformImg(backImgUrl, (urls) => {
                                // let i = 0
                                // const idTime = setInterval(() => {
                                //     console.log(urls[i])
                                //     img.src = urls[i]
                                //     i++
                                //     if (i === urls.length) {
                                //         i = 0
                                //     }
                                // }, 100);
                                GIF(urls, video.clientWidth, video.clientHeight, () => {
                                    console.log('完成')
                                    console.timeEnd()
                                })
                            })
                        }
                    })
                }
                



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

