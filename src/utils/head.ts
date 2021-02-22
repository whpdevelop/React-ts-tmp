import {setRem} from './rem'

window.constConfig = {
    baseRouterUrl:'',
    isPc:false,
    htmlEle:'',
    isWechat:false,
    isIOS:false
}

setRem()
window.onresize =  () => {
  setRem()
}
constConfig.htmlEle = document.querySelector('html')
let u = navigator.userAgent; 
constConfig.isWechat = u.toLowerCase().indexOf("micromessenger") > -1 ?true:false
constConfig.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// 公共路由
constConfig.baseRouterUrl = '';

