/*
 * @Author: your name
 * @Date: 2021-01-15 09:07:40
 * @LastEditTime: 2021-01-15 09:30:37
 * @LastEditors: Please set LastEditors
 * @Description: 视频处理成图片
 * @FilePath: \canvas\src\js\videoToImg.js
 */
import {createEl,addBody,initCanvas} from './dom.js'
 const getVideoFile = (file) => {
    let src = window.URL.createObjectURL(file)
    let video = createEl('video',{src,controls: true, autoplay: true})
    
 }


// <body>
// 	<div id="app">
// 		<input type="file" @change='fileUp' >
// 		<video v-show="video" :src="video" ref="video" controls autoplay></video>

// 		<p>画布 (代码在每20毫秒绘制当前的视频帧):</p>
// 		<canvas  ref="myCanvas"  width="270" height="135" style="border:1px solid #d3d3d3;">
// 		您的浏览器不支持 HTML5 canvas 标签。
// 		</canvas>
// 		<img :src="img" ref="img"  alt="" >
// 	</div>
// </body>
// <script>
// 	var vm = new Vue({
// 		el: '#app',
// 		data: {
// 			message: 'Hello Vue!',
// 			video: '',
// 			img:'',
// 			index: 0,
// 			i: 1
// 		},
// 		methods:{
// 			fileUp(e){
// 				let url = window.URL.createObjectURL(e.target.files[0])
// 				this.video = url

// 				window.v = this.$refs.video
// 				window.c = this.$refs.myCanvas
// 				window.img = this.$refs.img
// 				window.ctx = c.getContext('2d');
				
// 				v.currentTime = 1
// 				// 在当前帧的数据可用时执行 用于截图 onloadedmetadata:视频元数据加载成功
// 				v.onloadeddata = () => {
// 					this.xh(v.duration)
// 					console.log(v.duration,'总时间')
// 				}
// 				v.ontimeupdate = () => {
// 					this.xh(v.duration)
// 					console.log('改变',v.currentTime,this.index++)
// 				}
// 			},
// 			xh(allTime){
// 				if (this.i > allTime)  {
// 					v.pause()
// 					return false
// 				}			
// 				ctx.drawImage(v,0,0,270,135) 
// 				this.img = c.toDataURL('image/jpeg', 1)
// 				img.onload = () => {
// 					this.downImg()
// 				}
					
// 			},		
// 			// 下载图片
// 			downImg(){
// 				let a = document.createElement("a")
// 				a.href = this.img
// 				let event = new MouseEvent("click"); // 创建一个单击事件
//             	a.download = this.i || "photo"; // 设置图片名称
//             	a.dispatchEvent(event); // 触发a的单击事件	
// 				this.i += 10
// 				v.currentTime = this.i		
// 			},				
// 			// 开启定时器
// 			start(){
// 				setInterval(() => {
// 					this.ctx.drawImage(this.v,0,0,270,135) 
// 					this.img = this.c.toDataURL('image/jpeg', 0.1)
// 					this.downImg()
// 				}, 1000)				
// 			},
// 		}
// 	})
// </script>
// </html>