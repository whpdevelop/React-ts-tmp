
// 环境判断
window.devFlag = window.location.protocol === 'http:'?true:false

// rem等比适配配置文件
// 基准大小
const baseSize = 375 // 注意此值要与 postcss.config.js 文件中的 rootValue保持一致
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 375宽的缩放比例，可根据自己需要修改,一般设计稿都是宽750(图方便可以拿到设计图后改过来)。
  const scale = document.documentElement.clientWidth / 375
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
let isPcFn = () => {
    const width = document.documentElement.clientWidth
    if(width>750)
        window.isPc = true
    else 
        window.isPc = false
}
// 初始化
// setRem()
isPcFn()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
//   setRem()
    isPcFn()
}

window.htmlEle = document.querySelector('html')
let u = navigator.userAgent; 
window.isWechat = u.toLowerCase().indexOf("micromessenger") > -1 ?true:false
window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export {}
