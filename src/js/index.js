const createImg = (src) => {
    const img = document.createElement('img')
    img.src = src
    // img.setAttribute('crossOrigin', 'anonymous')
    return img
}
const putColorData = (ctx, data) => {
    ctx.putImageData(data, 0, 0);
  }

const getImgData = (ctx, canvas) => {
   let length = canvas.width * canvas.height;
   const myImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
   for (let i = 0; i < length * 4; i += 4) {
    let myRed = myImage.data[i];
    let myGreen = myImage.data[i + 1];
    let myBlue = myImage.data[i + 2];
    let myGray = parseInt((myRed + myGreen + myBlue) / 3);
    myImage.data[i] = myGray;
    myImage.data[i + 1] = myGray;
    myImage.data[i + 2] = myGray;
  }   
  console.log(myImage)
  putColorData(ctx, myImage)
}

const canvas = document.createElement('canvas')
const img = createImg('./img/1.jpg' || 'https://mrkj-kjj-test.oss-cn-hangzhou.aliyuncs.com//UploadFiles/images/1608879770966151.jpg')
const ctx = canvas.getContext("2d");
img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    canvas.style.background = "#000"
    ctx.drawImage(img, 0, 0);
    getImgData(ctx, canvas)
}
document.body.appendChild(canvas)